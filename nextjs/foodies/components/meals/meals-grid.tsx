import MealItem from './meal-item';
import classes from './meals-grid.module.css';

interface Meal {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    slug: any;
    summary: any; creator: any;
}

interface MealsGridProps {
    meals: Meal[];
}

export default function MealsGrid({ meals }: MealsGridProps) {
    return (
        <ul className={classes.meals}>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    );
}