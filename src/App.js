import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import arrow from './images/icon-arrow.svg'
import bg from './images/pattern-bg-desktop.png'
import MarkerPosition from './components/markerposition.js'
import Error from './components/error.js'

function App() {
  const rotate = ["hover:-rotate-1", "hover:rotate-1"]
  const [rotateIndex, setRotateIndex] = useState(rotate[Math.floor(Math.random() * rotate.length)])
  const [isError, setIsError] = useState(false)
  const [address, setAddress] = useState(null)
  const [ipAddress, setIpAddress] = useState("")
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY1}&ipAddress=192.212.174.101`);
        const data = await res.json();
        if (data.code !== 403) { setAddress(data) } else { setIsError(false) }
      }

      getInitialData();

    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleInput = async () => {
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY1}&${checkIpAddress.test(ipAddress) ? `ipAddress=${ipAddress}` : checkDomain.test(ipAddress) ? `domain=${ipAddress}` : ""}`)
    const data = await res.json();
    setAddress(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleInput()
    setIpAddress("")
  }

  return (
    <>
      <section>
        <div className='absolute -z-10 w-full'>
          <img src={bg} alt='background' className='object-cover w-full h-80 lg:text-3xl' />
        </div>
        <article className="p-8">
          <h1 className='text-2xl text-center text-white font-bold mb-8'>IP Address Tracker</h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className='flex justify-center max-w-xl m-auto'
            autoComplete='off'
          >
            <input
              className="py-2 px-4 rounded-l-lg w-full"
              type="text"
              name="ipaddress"
              placeholder="Search for any IP address or domain"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              required
            />
            <button
              type="submit"
              className='bg-black p-4 rounded-r-lg hover:opacity-60'
            >
              <img src={arrow} alt="arrow" />
            </button>
          </form>
        </article>
        {isError && <Error />}
        {address && <><article className='bg-white rounded-2xl p-8 mx-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl xl:mx-auto text-center md:text-left lg:-mb-16 relative'
          style={{ zIndex: "10000" }}
        >
          <div className='lg:border-r lg:border-slate-400 '>
            <h2 className='uppercase text-sm font-bold tracking-wider text-slate-500 mb-3'>
              Ip Address
            </h2>
            <p className='font-semibold text-slate-900 text-lg md:text-xl lg:text-2xl'>
              {address.ip ? address.ip : ""}
            </p>
          </div>
          <div className='lg:border-r lg:border-slate-400 '>
            <h2 className='uppercase text-sm font-bold tracking-wider text-slate-500 mb-3'>
              Location
            </h2>
            <p className='font-semibold text-slate-900 text-lg md:text-xl lg:text-2xl'>
              {address.location.city ? address.location.city : ""}, {address.location.region ? address.location.region : ""}
            </p>
          </div>
          <div className='lg:border-r lg:border-slate-400 '>
            <h2 className='uppercase text-sm font-bold tracking-wider text-slate-500 mb-3'>
              Timezone
            </h2>
            <p className='font-semibold text-slate-900 text-lg md:text-xl lg:text-2xl'>
              UTC {address.location.timezone ? address.location.timezone : "N/A"}
            </p>
          </div>
          <div className=''>
            <h2 className='uppercase text-sm font-bold tracking-wider text-slate-500 mb-3'>
              Isp
            </h2>
            <p className='font-semibold text-slate-900 text-lg md:text-xl lg:text-2xl'>
              {address.isp ? address.isp : ""}
            </p>
          </div>
        </article>
          <MapContainer
            center={[address.location.lat, address.location.lng]}
            zoom={13}
            scrollWheelZoom={true}
            className='-mt-60 md:-mt-16'
            style={{ height: "700px", width: "100%", zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerPosition address={address} />
          </MapContainer>
        </>}
        <footer
          className='bg-blue-900 w-full relative py-10 text-center flex justify-center align-center flex-col'
          style={{ zIndex: 10 }}
        >
          <p
            className={`text-white text-2xl ${rotateIndex}`}
            onMouseEnter={() => setRotateIndex(rotate[Math.floor(Math.random() * rotate.length)])}
            onMouseLeave={() => setRotateIndex("")}
            style={{ zIndex: "11" }}
          >Engineered with love by
            <a
              href='https://github.com/Fardindevm'
              target='_blank'
              rel='noreferrer'
              className='font-semibold'
            > Fardin Mohammadi</a>
          </p>
          <div className='flex justify-center gap-8 mt-5'>
            <a className="text-4xl text-white transition duration-300 ease-in-out  hover:scale-125" href="https://www.instagram.com/Fardinmo7" target='_blank' rel='noreferrer'>
              <i className="fab fa-instagram"></i>
            </a>
            <a className="text-4xl text-white transition duration-300 ease-in-out  hover:scale-125" href="https://github.com/Fardindevm" target='_blank' rel='noreferrer'>
              <i className="fab fa-github"></i>
            </a>
            <a className="text-4xl text-white transition duration-300 ease-in-out  hover:scale-125" href="mailto:fardinmohammadi504@gmail.com" target='_blank' rel='noreferrer'>
              <i className="fas fa-envelope"></i>
            </a>
            <a className="text-4xl text-white transition duration-300 ease-in-out  hover:scale-125" href="https://www.linkedin.com/in/fardin-mohammadi" target='_blank' rel='noreferrer'>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </footer>
      </section>
    </>
  );
}

export default App;
