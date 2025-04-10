import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategories from '../hooks/useCategories'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategories();

  return (
    <Layout title={"All Categories"}>
        <div className='p-2'>
            <div className='d-flex flex-column'>
                {categories?.map((c) => (
                    <div className='p-2' key={c._id}>
                        <Link to={`/category/${c.slug}`} className='btn btn-primary categories'>
                            {c.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories