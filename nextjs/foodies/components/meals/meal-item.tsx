import Link from 'next/link';
import Image from 'next/image';
import { S3_URL } from '@/lib/meals';
import classes from './meal-item.module.css';


export default function MealItem({ title, slug, image, summary, creator }) {
    const url = `${S3_URL}${image}`.trim();
    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    <Image src={url} alt={title} fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}