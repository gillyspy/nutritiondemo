export default class InvalidFoodAmountError extends Error{
    constructor( amount : number ) {
        super(`Invalid food amount ${amount} is not allowed`);
    }
}