class Sprite {
    img = null
    framesCount = 3
    framesCurrent = 0
    framesRefreshFrequency = 5
    framesRefreshCount = 0
    position = { x: 0, y: 0 }
    offset = { x: 0, y: 0 }
    printOffset = { x: 0, y: 0 }
    dimensions = { width: 0, height: 0 }
    margin = { top: 0, right: 0, left: 0, bottom: 0 }

    constructor({
        img,
        framesCount,
        position,
        offset,
        dimensions,
        framesRefreshFrequency = 5,
        printOffset = { x: 0, y: 0 },
        margin = { top: 0, right: 0, left: 0, bottom: 0 }
    }) {
        this.img = img
        this.framesCount = framesCount
        this.position = position
        this.offset = offset
        this.dimensions = dimensions
        this.framesRefreshFrequency = framesRefreshFrequency
        this.margin = margin
        this.printOffset = printOffset
    }

    draw({ position, dimensions, growingHeight = null, offsetMode = 0 }) {

        if (growingHeight === null) {
            growingHeight = dimensions.height
        }

        const growingHeightCalc = this.dimensions.height * growingHeight / dimensions.height

        //factors used to flip sprite horizontally or vertically based on negative dimensions
        const factorX = Math.sign(dimensions.width)
        const factorY = Math.sign(dimensions.height)


        //calculate where to print full sprite based on sprite size, margins, and object -player, monster, etc- size
        const srcImgX = this.position.x + this.offset.x * this.framesCurrent + offsetMode
        const srcImgY = this.position.y + this.offset.y * this.framesCurrent
        const srcImgWidth = this.dimensions.width
        const srcImgHeight = growingHeightCalc
        const destX = factorX * (position.x - scrollX + this.printOffset.x)
        const destY = factorY * (position.y + this.printOffset.y + dimensions.height - growingHeight)
        const destWidth = dimensions.width
        const destHeight = growingHeight

        const imgWithinSpriteWidth = srcImgWidth - this.margin.left - this.margin.right
        const imgWithinSpriteHeight = srcImgHeight - this.margin.top - this.margin.bottom

        const destMarginLeft = this.margin.left * dimensions.width / imgWithinSpriteWidth
        const destMarginRight = this.margin.right * dimensions.width / imgWithinSpriteWidth
        const destMarginTop = this.margin.top * dimensions.height / imgWithinSpriteHeight
        const destMarginBottom = this.margin.bottom * dimensions.height / imgWithinSpriteHeight

        ctx.save()

        if (factorX < 0 || factorY < 0) {
            ctx.scale(factorX, factorY)
        }

        ctx.drawImage(
            this.img,
            Math.ceil(srcImgX),
            Math.ceil(srcImgY),
            Math.ceil(srcImgWidth),
            Math.ceil(srcImgHeight),
            Math.ceil(destX - destMarginLeft),
            Math.ceil(destY - destMarginTop),
            Math.ceil(destWidth + destMarginLeft + destMarginRight),
            Math.ceil(destHeight + destMarginTop + destMarginBottom)
        )

        ctx.restore()

    }

    nextFrame(fps, speedBooster) {
        this.framesRefreshCount += 1
        if (this.framesRefreshCount > this.framesRefreshFrequency / speedBooster) {
            this.framesRefreshCount = 0
            this.framesCurrent = (this.framesCurrent + 1) % this.framesCount
        }
    }
}