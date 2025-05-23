import { useRouter } from 'next/router';

// our-domain.com/news/something-important

function DetailPage() {
    const router = useRouter();

    const newsId = router.query.newsId;

    //send a request ot the backend API
    //to fetch the news itemm with newsID

    return <h1>The Detail Page</h1>
}

export default DetailPage;