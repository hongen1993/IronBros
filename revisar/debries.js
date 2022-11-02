class Debris {
    position = { x: 0, y: 0 }
    velocity = { x: 0, y: 0 }
    dimensions = { width: 20, height: 20 }
    color = "lightbrown"
    img = null

    constructor({
        position,
        velocity = { x: 0, y: 0, angle: 0.1 },
        dimensions = { width: 20, height: 20 },
        color = "lightbrown"
    }) {
        this.velocity = velocity
        this.position = position
        this.dimensions = dimensions
        this.color = color
        this.angle = 0

        if (color === "lightbrown") {
            this.img = imageStore.debrisBrownBlock
        }

    }

    update(fps) {
        this.velocity.y += (GRAVITY),
            this.position.y += (this.velocity.y)
        this.position.x += (this.velocity.x)
        this.angle += this.velocity.angle

        if (
            this.position.x + this.dimensions.width - scrollX < 0 ||
            this.position.x - scrollX > canvas.width ||
            this.position.y > canvas.height
        ) {
            //if out of view then destroy object
            debris.splice(debris.indexOf(this), 1)
        }

        this.draw()
    }

    draw() {
        if (
            this.position.x + this.dimensions.width - scrollX > 0 &&
            this.position.x - scrollX < canvas.width
        ) { // only draw if is visible in the screen
            ctx.save()
            ctx.translate(this.position.x - scrollX + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2)
            ctx.rotate(this.angle)
            if (this.img !== null) {
                ctx.drawImage(
                    this.img,
                    0,
                    0,
                    this.dimensions.width,
                    this.dimensions.height,
                    -this.dimensions.width / 2,
                    -this.dimensions.height / 2,
                    this.dimensions.width,
                    this.dimensions.height
                )
            } else {
                ctx.drawImage(
                    this.img,
                    0,
                    0,
                    this.dimensions.width,
                    this.dimensions.height,
                    -this.dimensions.width / 2,
                    -this.dimensions.height / 2,
                    this.dimensions.width,
                    this.dimensions.height
                )
            }
            ctx.restore()
        }
    }

}