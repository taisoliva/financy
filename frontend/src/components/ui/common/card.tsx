interface Props {
    children: React.ReactNode
}

export const Card = ({ children }: Props) => {
    return (
        <div className="w-full h-20 bg-white rounded-lg">
            {children}
        </div>
    );
};