import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import { S3_URL } from '@/lib/meals';
import { S3 } from '@aws-sdk/client-s3';
import { get } from 'http';

export async function generateMetadata({ params }) {
    const { title, summary } = getMeal(params.mealSlug);

    if (!title || !summary) {
        notFound()
    }
    return {
        title,
        description: summary
    }
}

export default async function MealDetailsPage({ params }: { params: { mealSlug: string } }) {
    const meal = await getMeal(params.mealSlug);
     const url = `${S3_URL} ${meal.image}`.trim();
    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={url} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                    }}
                ></p>
            </main>
        </>
    );
}