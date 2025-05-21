export function StyledForm({title, children}){
    return (
        <form className="pt-3 p-6
            [&_input]:bg-white [&_input]:rounded-md [&_input]:text-black [&_input]:p-1
            [&_select]:bg-white [&_select]:rounded-md [&_select]:text-black [&_select]:p-1
            [&_textarea]:bg-white [&_textarea]:rounded-md [&_textarea]:text-black [&_textarea]:p-1
            [&_label]:self-start [&_label]:mt-6 [&_label]:mb-1
            [&_button]:mt-8 [&_button]:self-center
            flex flex-col rounded-2xl border-1 border-gray-700
            mx-10 mt-10 sm:w-1/2 sm:mx-auto">
            <h2 className="text-xl font-bold">{title}</h2>
            {children}
        </form>
    )
}