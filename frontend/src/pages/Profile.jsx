import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {editProfile} from "../store/profileSlice.js";
import {useNavigate} from "react-router-dom";


const Profile = () => {
   const user = useSelector(state => state.user.user);
   const dispatch = useDispatch();
   const navigate=useNavigate()

   const [age, setAge] = useState("");
   const [gender, setGender] = useState("");
   const [about, setAbout] = useState("");
   const [skillsString, setSkillsString] = useState("");
   const [image,setImage]=useState(null);
   const [preview, setPreview]=useState(null);

   useEffect(() => {
      if (user) {
         setAge(user.age || "");
         setGender(user.gender || "");
         setAbout(user.about || "");
         setSkillsString(user.skills?.join(", ") || "");
      }
   }, [user]);

   const skillArr = skillsString
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

   const displaySkills = skillArr.length > 0 ? skillArr : (user?.skills || []);

   async function handleUpdateProfile(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('about', about);
      skillArr.forEach((skill, index) => {
         formData.append(`skills[${index}]`, skill);
      });
      if (image) {
         formData.append('photoUrl', image);
      }

     await dispatch(editProfile(formData).unwrap());
      navigate("/dashboard")
   }
   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);

      if (file) {
         setPreview(URL.createObjectURL(file));
      }
   };


   return (
      <div>

         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span className="absolute top-[15%] right-[15%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '0s'}}>🌟</span>
            <span className="absolute top-[25%] left-[20%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}>🔥</span>
            <span className="absolute bottom-[20%] right-[20%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '2s'}}>🎯</span>
            <span className="absolute bottom-[30%] left-[15%] text-2xl opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>🌈</span>
         </div>
         <div className="flex flex-col justify-center items-center w-full mt-20">
            <h1 className="text-2xl font-bold ">Edit Your
               Profile</h1>
            <p className=" text-accent/70">Manage your
               profile information and preferences.</p>
         </div>

         <div className="flex items-center justify-center gap-8 w-full flex-col sm:flex-row ">


            {/*card*/}

            <div className={`hover-3d  pt-10 `}
            >

               <figure className="w-88 sm:w-80 lg:w-100 pt-0 rounded-2xl">
                  <img
                     src={preview || user?.photoUrl}
                     alt="Profile preview"
                     className="relative w-full h-140 lg:h-180 object-cover object-center rounded-2xl border-4 border-black"
                  />
                  <section className="bg-linear-to-b from-transparent via-base-200/60 to-base-100 absolute bottom-0 w-full h-120 pointer-events-none">
                     <div className="absolute -bottom-2 w-full h-60">
                        <span className="absolute -top-6 right-10 text-sm font-medium">{gender || user?.gender}</span>
                        <span className="absolute -top-6 right-4 text-sm font-medium">{age || user?.age}</span>
                        <p className="text-base-content text-4xl text-center font-bold capitalize captain mb-2">{user?.firstName} {user?.lastName}</p>
                        <ul className="flex items-center justify-center gap-2 pt-2 mx-4 flex-wrap pb-2">
                           {displaySkills.map((skill, ind) =>
                              <li key={ind} className="px-3 py-1 bg-secondary rounded-full text-secondary-content text-xs my-0.5">{skill}</li>
                           )}
                        </ul>
                        <h4 className="text-xs px-4 py-2 text-center">{about || user?.about}</h4>
                     </div>
                  </section>
               </figure>


               {/*   */}
            </div>

            {/* input */}
            <div className="pt-10">
               <form
                  onSubmit={handleUpdateProfile}
                  className="flex flex-col gap-4 max-w-sm bg-base-200/50 backdrop-blur-sm p-6 rounded-2xl border border-base-300 shadow-xl w-full"
               >
                  {/* Age Field */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text flex items-center gap-2 text-sm font-medium">
                           <span>🔖</span> Age
                        </span>
                     </label>
                     <input
                        type="number"
                        min="18"
                        max="100"
                        className="input input-bordered bg-base-100 focus:input-primary transition-all"
                        placeholder="Enter your age"
                        autoComplete="off"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                     />
                  </div>

                  {/* Gender Field */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text flex items-center gap-2 text-sm font-medium">
                           <span>🌈</span> Gender
                        </span>
                     </label>
                     <div className="flex flex-wrap gap-3 mt-1">
                        <label className="label cursor-pointer justify-start gap-2 bg-base-100/50 px-4 py-2 rounded-xl border border-base-300 hover:border-primary/50 transition-all">
                           <input
                              type="radio"
                              name="gender"
                              className="radio radio-primary radio-sm"
                              checked={gender === "male"}
                              value="male"
                              onChange={(e) => setGender(e.target.value)}
                           />
                           <span className="label-text text-sm">Male</span>
                        </label>

                        <label className="label cursor-pointer justify-start gap-2 bg-base-100/50 px-4 py-2 rounded-xl border border-base-300 hover:border-primary/50 transition-all">
                           <input
                              type="radio"
                              name="gender"
                              className="radio radio-primary radio-sm"
                              checked={gender === "female"}
                              value="female"
                              onChange={(e) => setGender(e.target.value)}
                           />
                           <span className="label-text text-sm">Female</span>
                        </label>

                        <label className="label cursor-pointer justify-start gap-2 bg-base-100/50 px-4 py-2 rounded-xl border border-base-300 hover:border-primary/50 transition-all">
                           <input
                              type="radio"
                              name="gender"
                              className="radio radio-primary radio-sm"
                              checked={gender === "others"}
                              value="others"
                              onChange={(e) => setGender(e.target.value)}
                           />
                           <span className="label-text text-sm">Others</span>
                        </label>
                     </div>
                  </div>

                  {/* About Field */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text flex items-center gap-2 text-sm font-medium">
                           <span>📝</span> About
                        </span>
                     </label>
                     <textarea
                        rows={3}
                        placeholder="Enter about yourself..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="textarea textarea-bordered bg-base-100 focus:textarea-primary transition-all resize-none"
                     />
                  </div>

                  {/* Skills Field */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text flex items-center gap-2 text-sm font-medium">
                           <span>⛷️</span> Skills
                        </span>
                     </label>
                     <input
                        type="text"
                        value={skillsString}
                        onChange={(e) => setSkillsString(e.target.value)}
                        className="input input-bordered bg-base-100 focus:input-primary transition-all"
                        placeholder="Enter skills comma separated"
                     />
                     <label className="label">
                        <span className="label-text-alt text-base-content/50">Separate skills with commas</span>
                     </label>
                  </div>

                  {/* Photo Field */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text flex items-center gap-2 text-sm font-medium">
                           <span>😎</span> Upload a photo
                        </span>
                     </label>
                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input file-input-bordered bg-base-100 focus:file-input-primary transition-all"
                     />
                  </div>

                  {/* Submit Button */}
                  <button
                     type="submit"
                     className="btn btn-primary w-full mt-2 shadow-lg hover:shadow-xl transition-all"
                  >
                     Save Changes 💾
                  </button>
               </form>
            </div>
         </div>
      </div>
   )
}
export default Profile
