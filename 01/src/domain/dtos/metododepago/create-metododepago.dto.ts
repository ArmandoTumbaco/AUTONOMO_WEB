export class CreateMetodoDePagoDto {
    private constructor(public readonly metodoPago: string) {}

    getValues() {
        return {
            metodoPago: this.metodoPago
        };
    }

    static create(props: { [key: string]: any }): [string?, CreateMetodoDePagoDto?] {
        const { metodoPago } = props;

        if (!metodoPago) {
            return ['metodoPago property is required', undefined];
        }

        return [undefined, new CreateMetodoDePagoDto(metodoPago)];
    }
}
