import { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
 
   const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [link, setLink] = useState("");
  
  const post1=async(e)=>
  {
    e.preventDefault();
     try {
      const res = await axios.post("https://message-xv8u.onrender.com", {
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: maxViews ? Number(maxViews) : undefined,
      });

      setLink(res.data.url);
      setContent("");
      setTtl("");
      setMaxViews("");
    } catch (err) {
      alert("Error creating paste");
    }


    
  };

  return (
    <div className="App">
        <div className="left-bg" style={{ backgroundImage: "url('/background.png')" }}>
        <div className="overlay">
          <h1>Secure Message Transfer</h1>
          <p>
            Type your secret message and generate a secure link to share.
          </p>
        </div>
      </div>

     <div className="text">


   <form onSubmit={post1} >
    
  <label>Paste Content</label>
  <input type='text' value={content} onChange={(e)=>setContent(e.target.value)}/>
   <label>Time to Live (TTL in seconds)</label>
<input type='number' value={ttl} onChange={(e)=>setTtl(e.target.value)}/>
 <label>Maximum Views</label>
<input type='number' value={maxViews} onChange={(e)=>setMaxViews(e.target.value)}/>
   <button type='submit'>submit</button>
   </form>
   
      {link && (
  <div className="link-box">
    <h3>Generated Link:</h3>
    <a href={link} target="_blank" rel="noreferrer">
      {link}
    </a>
  </div>
)}

     </div>
    </div>
  );
}

export default App;
