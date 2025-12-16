import { stats } from "./stats-data";
import { useParams } from "react-router-dom";

import { useOutletContext } from "react-router-dom";

import { useState, useEffect } from "react";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { logger } from "../../scripts/logger";

import { useNavigate } from "react-router-dom";

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut, Line, Pie } from "react-chartjs-2";
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.font.family = "Playpen Sans Arabic";
defaults.plugins.title.display = true;
defaults.plugins.title.align = "end";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.font.family = "Playpen Sans Arabic";
defaults.plugins.title.color = "white";

const Stat = ({ latest = false }) => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const { latestStory } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    // setData(stats.find((stat) => stat.count == id));
    if (!latest) setData(stats.find((stat) => stat.count == id));
    if (latest) navigate(`/stats/${latestStory}`);

    async function log() {
      if (
        import.meta.env.MODE !== "development" &&
        user?.username !== "mohsaid99"
      ) {
        await logger(user?.username, `Stats | ${id}`);
      }
    }

    log();
  }, [id, user?.username, latest, latestStory, navigate]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 pt-10 pb-30 text-2xl font-bold md:p-10">
      <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row md:px-5 [&_div]:md:min-w-[50%]">
        {data?.doughnut && (
          <div className="flex w-full flex-wrap items-center justify-center gap-5 md:max-w-[600px]">
            <div className="chart h-[600px] w-full border border-r-0 border-l-0 p-10 md:rounded-2xl md:border-r md:border-l">
              <Doughnut
                data={{
                  labels: data.doughnut.data.map((d) => d.label),
                  datasets: [
                    {
                      data: data.doughnut.data.map((d) => d.value),
                      backgroundColor: [
                        "#3b82f6",
                        "#10b981",
                        "#f59e0b",
                        "#ef4444",
                        "#8b5cf6",
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "الروتين اليومي",
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
        {data?.workout && (
          <div className="flex w-full flex-wrap items-center justify-center gap-5 md:max-w-[600px]">
            <div className="chart h-[600px] w-full border border-r-0 border-l-0 p-10 md:rounded-2xl md:border-r md:border-l">
              <Pie
                data={{
                  labels: data.workout.data.map((d) => d.label),
                  datasets: [
                    {
                      data: data.workout.data.map((d) => d.value),
                      backgroundColor: [
                        "#3b82f6",
                        "#10b981",
                        "#f59e0b",
                        "#ef4444",
                        "#8b5cf6",
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "تمارين الرياضة",
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
      {data?.line ? (
        <div className="chart h-[600px] w-full border border-r-0 border-l-0 p-5 md:rounded-2xl md:border-r md:border-l">
          <Line
            data={{
              labels: data.line.data.map((d) => d.label),
              datasets: [
                {
                  data: data.line.data.map((d) => d.value),
                  label: "ساعات",

                  borderColor: "rgb(59, 130, 246)",
                  fill: true,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  pointBackgroundColor: "rgb(59, 130, 246)",
                  pointRadius: 4,
                  pointHoverRadius: 6,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: false,
                  min: 0,
                  max: 40,
                },
                // x: {
                //   offset: true,
                // },
              },
              plugins: {
                title: {
                  text: "وقت التركيز",
                },
              },
              elements: {
                line: {
                  tension: 0.3,
                },
              },
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Stat;
