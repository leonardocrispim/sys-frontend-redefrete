type DataProps = {
    content: string
}

export default function FormTitle({ content }: DataProps) {
    return (
        <h2 className="font-semibold text-gray-800 text-lg underline-offset-8 underline mr-4">
            { content }
        </h2>
    )
}