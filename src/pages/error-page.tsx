import { useRouteError } from "react-router-dom";

type Error = {
    statusText: string;
    message: string;
};

export default function ErrorPage() {
    const error = useRouteError() as Error;
    return (
        <div
            className={
                "w-screen h-screen bg-base-background flex justify-center items-center gap-4 flex-col"
            }
        >
            <h1 className={"text-xl "}>Oops!</h1>
            <p className={"text-base-text font-bold"}>Ocorreu um erro</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
