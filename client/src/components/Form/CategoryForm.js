import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <div className='categoryForm'>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter New Category.."
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </>
  )
}

export default CategoryForm
