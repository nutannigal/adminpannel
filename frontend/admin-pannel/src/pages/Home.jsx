 function Home() {
  return (
    <div>
      <div className="jumbotron bg-light p-5 rounded">
        <h1> welcome to creative web solution</h1>
        <p>we are provide it solution for your business</p>

        <a href="/services" className="btn-btn-primary">Our Services</a>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <h3>Web developement</h3>
          <p> design client web aplications </p>
        </div>
        <div className="col-md-4"></div>
        <h3>mobile app</h3>
        <p>ios and android app </p>
      </div>
    </div>

  )
}
export default Home;