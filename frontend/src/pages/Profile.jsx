import React from 'react'



const Profile = () => {



   return (
      <div>
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span className="absolute top-[15%] right-[15%] text-2xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>🌟</span>
            <span className="absolute top-[25%] left-[20%] text-2xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🔥</span>
            <span className="absolute bottom-[20%] right-[20%] text-2xl opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>🎯</span>
            <span className="absolute bottom-[30%] left-[15%] text-2xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>🌈</span>
         </div>
         <div className="flex flex-col justify-center items-center w-full mt-20">
            <h1 className="text-2xl font-bold ">Edit Your Profile</h1>
            <p className=" text-accent/70">Manage your profile information and preferences.</p>
         </div>

      </div>
   )
}
export default Profile
