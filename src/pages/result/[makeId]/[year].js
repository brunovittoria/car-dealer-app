import { Suspense } from "react";
import Spinner from "../../../components/Spinner";

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking", //Iam using this to enable server-side rendering (SSR) for paths that haven't be generated yet.
    };
}

export async function getStaticProps({ params }) {
    const { makeId, year } = params;
    const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data = await res.json();

    if (!data.Results || data.Results.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
        models: data.Results,
        makeId,
        year,
        },
    };
}

export default function ResultPage({ models, makeId, year }) {
    return (
        <Suspense fallback={<Spinner />}>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 p-4 md:p-8 lg:p-12">
            <h1 className="text-2xl md:text-4xl lg:text-5xl">
                Vehicle Models for {makeId} - {year}
            </h1>
            <ul className="w-full max-w-lg mx-auto mt-4">
            {models.map((model) => (
                <li
                key={model.Model_ID}
                className="border-b border-gray-300 py-2 text-base md:text-lg lg:text-xl"
                >
                {model.Model_Name}
                </li>
            ))}
            </ul>
        </div>
        </Suspense>
    );
}
