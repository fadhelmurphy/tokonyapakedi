import styled from "@emotion/styled";
import { css } from "@emotion/css";
export default function Desktop({ onAdd = () => {}, ...props }) {
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
  const ActionCard = styled.div`
    height: auto;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
    & p {
      font-weight: 500;
      border-radius: 5px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 35px;
      background: #1b8884;
      text-decoration: none;
      color: #fff;
      margin: 10px 0 0 0;
      box-sizing: border-box;
      cursor: pointer;
    }
  `;
  const ChildDetailContainer = css`
  .header .img-banner {
    width: 100%;
    height: 200px;
    background: #f2f2f2;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
}
.header .img-banner img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}
.col-8 {
    padding: 25px;
}
.img-detail img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 15px;
}
  `
  return (
    <>
      <div className={`container ${ChildDetailContainer}`}>
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
                <h1>{english || romaji}</h1>
              </span>
              <span className="format">
                <p>
                  Format : <b>{format}</b>
                </p>
              </span>
              <span className="episodes">
                <p>
                  Episodes : <b>{episodes}</b>
                </p>
              </span>
              <span className="status">
                <p>
                  Status : <b>{status}</b>
                </p>
              </span>
              <span className="genres">
                <p>
                  Genre :{" "}
                  <b>
                    {
                      // Checks whether genre has true in order to display
                      genres && genres.length >= 1
                        ? genres.join(", ")
                        : "Unknown"
                    }
                  </b>
                </p>
              </span>
              <span className="studios">
                <p>
                  Studio :{" "}
                  <b>
                    {
                      // Checks whether anime has studios before accessing key
                      studios.nodes && studios.nodes.length >= 1
                        ? !studios.nodes[0].name
                          ? "Unknown"
                          : studios.nodes[0].name
                        : "Unknown"
                    }
                  </b>
                </p>
              </span>
              <span className="rating">
                <p>
                  Rating : <b>{averageScore}%</b>
                </p>
              </span>
              <ActionCard onClick={() => onAdd(props)} className="action-card">
                <p>ADD TO COLLECTION</p>
              </ActionCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
