import { useEffect, useState } from 'react';
import Areas from '../components/Areas';
import Chart from '../components/Chart';
import { fetchPrefecturesList, fetchPopulation } from '../lib/api';

export default function IndexPage({ prefacturesList }) {
  const [populations, setPopulations] = useState([]);
  useEffect(() => {
    fetchPopulation(12).then((data) => {
      setPopulations([...populations, data]);
    });
  }, []);
  return (
    <div>
      <h1>総人口推移グラフ</h1>
      <div>
        {prefacturesList.map((pref, index) => (
          <div key={index}>{pref.prefName}</div>
        ))}
      </div>
      <div>
        {populations.map((pops, index) => (
          <div key={index}>
            <div>{pops.boundaryYear}</div>
            <div>
              {pops.data.map((p, index) => (
                <div key={index}>
                  <p>{p.label}</p>
                  {p.data.map((y, index) => (
                    <div key={index}>
                      <p>{y.year}</p>
                      <p>{y.value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = () => {
  return fetchPrefecturesList().then((data) => {
    return {
      props: {
        prefacturesList: data,
      },
    };
  });
};
