import React from 'react'
import { FaEye } from "react-icons/fa";
import { useRef,useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid'

const Manager = () => {
  const ref=useRef();
  const passRef=useRef();
  const [form, setform] = useState({site:"",username:"",password:""});
  const [passwordArray, setpasswordArray] = useState([]);


  //mongodb code
  // const getPasswords=async()=>{
  //   let req=await fetch("http://localhost:3000/");
  //   let passwords=await req.json();
  //   console.log(passwords);
  //   setpasswordArray(passwords);
 
  // }
  //mongodb code



  useEffect(()=>{
    //getPasswords();
    
    let passwords=localStorage.getItem("passwords");
    let passwordArray;
    if(passwords){
      setpasswordArray(JSON.parse(passwords));
    }
  },[])



  const showPassword=()=>{
    
    if(ref.current.src.includes("/eye-crossed-svgrepo-com.svg")){
      ref.current.src="/eye-svgrepo-com.svg"
      passRef.current.type="text";
    }
    else{
      ref.current.src="/eye-crossed-svgrepo-com.svg"
      passRef.current.type="password";

    }
    
  }

  const savePassword=async ()=>{
    
    setpasswordArray([...passwordArray,{...form,id:uuidv4()}]);

    //mongo code
    // let res=await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-type":"application/json"},
    //   body:JSON.stringify({...form,id:uuidv4()})
    // })


    localStorage.setItem("passwords",JSON.stringify([...passwordArray,{...form,id:uuidv4()}]));
    console.log([...passwordArray,form]);
    setform({site:"",username:"",password:""});
    toast('Password saved!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });


  }

  const deletePass=async(id)=>{

    let c=confirm('Do you want to delete this password?');
    if(c){
      setpasswordArray(passwordArray.filter((item)=>{
        return (item.id!==id);
      }))
  
      localStorage.setItem("passwords",JSON.stringify(passwordArray.filter((item)=>{
        return (item.id!==id);
      })))

      //mongo code
      // let res=await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-type":"application/json"},
      //   body:JSON.stringify({id})
      // })

  
      toast('Deleted!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
      });

    }
    
    
    
  }

  const handleChange=(e)=>{
    setform({...form,[e.target.name]:e.target.value});

  }
  
  const copyText=(text)=>{
    toast('Copied!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
    navigator.clipboard.writeText(text);


  }

  const handleEdit=async(id)=>{
    const data=passwordArray.find((item)=>{
      return item.id===id;
    })

    setform(data);
    // let res=await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-type":"application/json"},
    //   body:JSON.stringify({id})
    // })

    const newPassArray=passwordArray.filter((item)=>{
      return (item.id!==id);
    })

    setpasswordArray(newPassArray);   
  }

  
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    <div className="absolute -z-10 w-full min-h-screen bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      
      {/* <div className="absolute inset-0 -z-10 w-full h-auto bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div> */}

      <div className="px-0 mycontainer md:px-2 w-full md:w-[60vw] mycontainer">
        <h1 className="text-3xl font-bold text-center">
          <span className="text-purple-500">&lt;</span>
          Lock
          <span className="text-purple-500">Vault/&gt;</span>
        </h1>
        <p className="text-black text-lg text-center font-serif">
          Your own password manager
        </p>

        <div className="flex flex-col p-4 text-black gap-4 items-center">
          <input
            className="rounded-full border border-purple-400 w-full px-4 py-1"
            type="text"
            name="site"
            placeholder="Enter website URL"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-4 ">
            <input
              className="rounded-full border border-purple-400 w-full px-4 py-1"
              type="text"
              name="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                className="rounded-full border border-purple-400 w-full px-4 py-1"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                ref={passRef}
              />
              <span
                className="absolute right-0 top-[1px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="px-2 py-1"
                  src="/eye-crossed-svgrepo-com.svg"
                  alt="eye"
                  width={38}
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="text-white font-bold flex justify-center items-center bg-purple-400 rounded-full py-2 px-4 w-fit hover:bg-purple-500 gap-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>
            Save Pasword
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>

          {passwordArray.length === 0 && (
            <div className="text-slate-500">No passwords to show...</div>
          )}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-purple-400 text-white">
                <tr>
                  <th className="py-2 ">Site</th>
                  <th className="py-2 ">Username</th>
                  <th className="py-2 ">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {passwordArray.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="border-2 py-2 border-white text-center ">
                        <div className="flex justify-center gap-3">
                          <a href={item.site} >
                            {item.site}
                          </a>
                          <img
                            className="h-5 cursor-pointer"
                            src="/public/copy-svgrepo-com.svg"
                            alt=""
                            onClick={() => {
                              copyText(item.site);
                            }}
                          />
                        </div>
                      </td>
                      <td className="border-2 py-2 border-white text-center ">
                        <div className="flex justify-center gap-3">
                          {item.username}
                          <img
                            className="h-5 cursor-pointer"
                            src="/public/copy-svgrepo-com.svg"
                            alt=""
                            onClick={() => {
                              copyText(item.username);
                            }}
                          />
                        </div>
                      </td>
                      <td className="border-2 py-2 border-white text-center ">
                        <div className="flex justify-center gap-3">
                          {"*".repeat(item.password.length)}
                          <img
                            className="h-5 cursor-pointer"
                            src="/public/copy-svgrepo-com.svg"
                            alt=""
                            onClick={() => {
                              copyText(item.password);
                            }}
                          />
                        </div>
                      </td>

                      <td className="border-2 py-2 border-white text-center ">
                        <div className="flex justify-evenly">
                          <button
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="26"
                              height="26"
                              color="#c084fc"
                              fill="none"
                              onMouseOver={(e) =>
                                (e.currentTarget.style.color = "#c084fe")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.color = "#c084fc")
                              }
                            >
                              <path
                                d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11 20H17"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                            </svg>
                            
                          </button>
                          <button
                            onClick={() => {
                              deletePass(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              colors="primary:#c69cff"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Manager
