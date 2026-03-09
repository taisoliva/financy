interface Props {
    category: string
    color?: string
    total: number
}

export const Footer = ({ category, color, total }: Props) => {
    return (
        <div className="flex justify-between items-center">
            <div
                className="text-xs font-semibold px-2 py-1 rounded-md transition-colors"
                style={{
                    backgroundColor: color ? `${color}3A` : undefined,
                    color: color
                }}
            >
                {category}
            </div>
            <div className="text-sm text-muted-foreground">{total} itens</div>
        </div>
    )
}