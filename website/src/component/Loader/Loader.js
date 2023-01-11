import './Loader.scss'
function Loader() {
    return (
        <div className="LoaderPage">
            <div className='Loader'></div>
            <p className='Text'>Chargement en cours <span className='Point1'>.</span><span className='Point2'>.</span><span className='Point3'>.</span></p>
        </div>
    )
}

export default Loader