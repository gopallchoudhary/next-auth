export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center min-h-screen py-2 justify-center">
            <h1>Profile</h1>
            <hr />
            <p className="sm:text-4xl mt-4 sm:mt-8">profile id: <span className="bg-orange-500 text-black ml-2 p-2 rounded font-semibold">{params.id}</span></p>
        </div>
    )
}