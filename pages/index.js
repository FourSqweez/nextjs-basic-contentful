import { createClient } from 'contentful'
import RecipeCard from '../components/RecipeCard'
import Masonry from 'react-masonry-css'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'recipe' })

  return {
    props: { recipes: res.items },
    revalidate: 1,
  }
}

export default function Recipes({ recipes }) {
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {recipes.map((recipe) => (
        <div key={recipe.sys.id}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </Masonry>
  )
}
