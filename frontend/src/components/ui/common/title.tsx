interface Props {
    title: string
    description: string
}

export const Title = ({ title, description }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    );
};