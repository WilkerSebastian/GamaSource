import { describe, expect, it } from "bun:test"
import { Vector2 } from "../dist/index"

describe("instance vector", () => {

    it("new vector2", () => {

        const vec = new Vector2(5 , -7)

        expect([
            vec.x,
            vec.y
        ]).toEqual([5, -7])

    })

    it("vector2 zero", () => {

        const vec = Vector2.zero()

        expect([
            vec.x,
            vec.y
        ]).toEqual([0, 0])

    })

    it("instance result of operation", () => {

        const vec = new Vector2(-3 , 5).add(new Vector2(2, 1))

        expect([
            vec.x,
            vec.y
        ]).toEqual([
            -1,
            6
        ])

    })

})