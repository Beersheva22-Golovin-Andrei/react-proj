
export default class LifeMatrix {
    constructor(private _numbers: number[][]) {
    }

    get numbers() {
        return this._numbers;
    }

    next(): number[][] {
        const newMatrix = this._numbers.map((row, i) => row.map((num, j) => {
            let res = num;
            const aliveNeighbours = this._getCountAliveNeighbours(this._numbers, i, j);
            if (num == 0) {
                if (aliveNeighbours == 3) {
                    res = 1;
                }
            } else if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                res = 0;
            }
            return res;
        }))
        this._numbers = newMatrix;
        return this._numbers;
    }

    private _getCountAliveNeighbours(matrix: number[][], i: number, j: number): number {
        function elFn(x: number, y: number) {
            let res;
            try {
                res = matrix[x][y]
            } catch (err) { }
            return res;
        }
        const resArr = [elFn(i - 1, j - 1), elFn(i, j - 1), elFn(i + 1, j - 1), elFn(i - 1, j), elFn(i + 1, j), elFn(i - 1, j + 1), elFn(i, j + 1), elFn(i + 1, j + 1)];
        return resArr.filter(num => num != undefined && num > 0).length
    }
}