interface Props {
  category: string
  description: string
}

export const Description = ({ category, description }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{category}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}