import { useEffect, useState } from "react";

export function useFetch(fetchFn: () => Promise<any>, initialValue: any) {
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState({ message: "" });
	const [fetchedData, setFetchedData] = useState(initialValue);

	useEffect(() => {
		async function fetchData() {
			setIsFetching(true);
			try {
				const data = await fetchFn();
				setFetchedData(data);
			} catch (error: { message: string } | any) {
				setError({ message: error.message || "Failed to fetch data." });
			}

			setIsFetching(false);
		}

		fetchData();
	}, [fetchFn]);

	return {
		isFetching,
		fetchedData,
		setFetchedData,
		error,
	};
}
