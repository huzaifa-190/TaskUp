import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export default function TasksLoader() {
  return (
    <div className='flex w-screen h-[60%] items-center justify-center text-xl'>
        {/* <h1>Fetching your Tasks ...</h1> */}
        <ClipLoader
            //   loading={isLoading}
            //   cssOverride={loaderCss}
              color={'#23df20'}
              size={50}
              aria-label="Adding new task ..."
              data-testid="loader"
              />
    </div>
  )
}
