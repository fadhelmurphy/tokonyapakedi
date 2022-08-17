export default function Desktop({onAdd = () => {}, ...props }) {
  const {
    href = `/anime/${props.id}`,
    bannerImage,
    coverImage: { large = "" },
    title: { english = "", romaji = "" },
    format,
    episodes,
    status,
    studios,
    genres,
    averageScore,
  } = props;
  return (
    <>
      <div className="container">
        <div className="col-12">
          <div className="header">
            <div className="img-banner">
              <img src={bannerImage} alt="banner image" />
            </div>
          </div>
          <div className="content grid">
            <div className="col-4">
              <div className="img-detail">
                <img src={large} alt="image detail" />
              </div>
            </div>
            <div className="col-8">
              <span className="title">
                <h1>{english}</h1>
              </span>
              <span className="format">
                <p>Format : <b>{format}</b></p>
              </span>
              <span className="episodes">
                <p>Episodes : <b>{episodes}</b></p>
              </span>
              <span className="status">
                <p>Status : <b>{status}</b></p>
              </span>
              <span className="genres">
                <p>Genre : <b>
                {
                  // Checks whether genre has true in order to display
                  genres && genres.length >= 1
                    ? genres.join(", ")
                    : "Unknown"
                }</b></p>
              </span>
              <span className="studios">
              <p>Studio : <b>
                  {
                    // Checks whether anime has studios before accessing key
                    studios.nodes &&
                    studios.nodes.length >= 1
                      ? !studios.nodes[0].name
                        ? "Unknown"
                        : studios.nodes[0].name
                      : "Unknown"
                  }</b></p>
              </span>
              <span className="rating">
                <p>Rating : <b>{averageScore}%</b></p>
              </span>
              <div onClick={()=>onAdd(props)} className="action-card"><p>ADD</p></div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        
        div.action-card {
            height: auto;
            width: 100%;
            box-sizing: border-box;
            z-index: 1;
            transition: all .5s ease;
          }
          div.action-card p {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 35px;
            background: #000;
            text-decoration: none;
            color: #fff;
            margin: 10px 0 0 0;
            box-sizing: border-box;
            cursor: pointer;
          }
        .header .img-banner {
            width: 100%;
            height: 200px;
            background: #f2f2f2;
            position: relative;
            overflow: hidden;
        }
        .header .img-banner img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
        .img-detail {
            padding: 20px;
        }
        .img-detail img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
        `}
      </style>
    </>
  );
}
