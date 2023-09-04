
import { useForm } from 'react-hook-form';

const AddBlogForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const categories = ['Technology', 'programming', 'writing']; 

  const onSubmit = data => {
    console.log(data); 
  };

  const today = new Date().toISOString().substr(0, 10); 

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Add New Blog</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="w-3/5 mx-auto">
      <div className="mb-4">
        <label htmlFor="blogImage" className="block text-gray-700 font-medium mb-1">
          Blog Image URL
        </label>
        <input
          type="text"
          id="blogImage"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.blogImage ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('blogImage', { required: 'Image URL is required' })}
        />
        {errors.blogImage && <p className="text-red-500 mt-1">{errors.blogImage.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="blogTitle" className="block text-gray-700 font-medium mb-1">
          Blog Title
        </label>
        <input
          type="text"
          id="blogTitle"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.blogTitle ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('blogTitle', { required: 'Title is required' })}
        />
        {errors.blogTitle && <p className="text-red-500 mt-1">{errors.blogTitle.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="blogDetails" className="block text-gray-700 font-medium mb-1">
          Blog Details
        </label>
        <textarea
          id="blogDetails"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.blogDetails ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('blogDetails', { required: 'Details are required' })}
        />
        {errors.blogDetails && <p className="text-red-500 mt-1">{errors.blogDetails.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="blogAuthor" className="block text-gray-700 font-medium mb-1">
          Blog Author
        </label>
        <input
          type="text"
          id="blogAuthor"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.blogAuthor ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('blogAuthor', { required: 'Author is required' })}
        />
        {errors.blogAuthor && <p className="text-red-500 mt-1">{errors.blogAuthor.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="blogCategory" className="block text-gray-700 font-medium mb-1">
          Blog Category
        </label>
        <select
          id="blogCategory"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.blogCategory ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('blogCategory', { required: 'Category is required' })}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.blogCategory && <p className="text-red-500 mt-1">{errors.blogCategory.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="blogDate" className="block text-gray-700 font-medium mb-1">
          Blog Date
        </label>
        <input
          type="date"
          id="blogDate"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.blogDate ? 'border-red-500' : 'border-gray-300'
          }`}
          defaultValue={today}
          {...register('blogDate', { required: 'Date is required' })}
        />
        {errors.blogDate && <p className="text-red-500 mt-1">{errors.blogDate.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
      >
        Add Blog
      </button>
    </form>
  </div>
  );
};

export default AddBlogForm;
