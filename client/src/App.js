import './App.css';
import {useState, useEffect} from "react";
import Axios from 'axios'

function App() {
  //Use state
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');
  //Use Effect
  useEffect(()=>{
    Axios.get('http://localhost:3420/api/get').then((response)=>{
      // console.log(response.data);
      setMovieList(response.data);
    });
  }, [])

  const submitReview = () => {
    console.log("SUBMIT REVIEW FRONTEND")

    Axios.post("http://localhost:3420/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      console.log("INSERTED")
      alert("Successful insert");
    });

    // This will visually add new element in frontend.
    setMovieList([
      ...movieList,
      {movieReview: review, movieName: movieName}
    ]);
    
    console.log("end submit review frontend");
  };

  const deleteReview = (movie) => {
    console.log("IN delete review");
    console.log(movie);
    Axios.delete('http://localhost:3420/api/delete/'+movie);
  }

  const updateMovieReview = (movie,newReview) => {
    console.log(newReview);
    console.log(movie);
    Axios.put('http://localhost:3420/api/update', {
      movieName: movie,
      movieReview: newReview,
    }).then(()=>{
      console.log("UPDATED")
    });
  }

  return (
    <div className="App">
      <h1>CRUD MOVIE REVIEW APPLICATION</h1>

      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name ="movieName" onChange={(e)=>{
          setMovieName(e.target.value);
        }}/>
        <label>Movie Review:</label>
        <input type="text" name="movieReview" onChange={(e)=>{
          setReview(e.target.value);
        }}/>
        <button onClick={submitReview}>Submit</button>

        {movieList.map((val) => {
          return (
              <div className="card">
                <h1>{val.movieName}</h1>
                <p>{val.movieReview}</p>

                <button id="button" onClick={() => {deleteReview(val.movieName)}}>Delete</button>
                <button id="button" onClick={() => {updateMovieReview(val.movieName,newReview)}}>Update</button>
                <input type="text" id="inputUpdate" onChange={(e) => 
                  {setNewReview(e.target.value)
                }}/>
              </div>
            )
        })}
      </div>

    </div>
  );
}

export default App;  
