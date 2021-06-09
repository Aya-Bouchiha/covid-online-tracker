import { formatNumber } from "../Utilities/formatNumber"; // to format numbers example:1000 => '1k'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useFetch from "../Utilities/useFetch";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined"; //cases
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined"; //recovered
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"; //deaths
const CountryCards = ({ url }) => {
  /*
        @cases
        @recovered
        @deaths
    */
  const data =  useFetch(url, [url])  // the data of one country like its cases,name,flag...
  const totalCases = formatNumber(data?.cases) || "",
    todayCases = formatNumber(data?.todayCases) || "",
    totalRecovered = formatNumber(data?.recovered) || "",
    todayRecovered = formatNumber(data?.todayRecovered) || "",
    totalDeaths = formatNumber(data?.deaths) || "",
    todayDeaths = formatNumber(data?.todayDeaths) || "";
  return (
    <article className="article-info">
      {data != null && (
        <>
          <Card className="card-info">
            <CardMedia className="card-media-info" title="Paella dish">
              <LocalHospitalOutlinedIcon  color="primary" className="info-icon" />
            </CardMedia>
            <CardContent>
              <div className="text-info-">
                <Typography color="primary" variant="h2">
                  {totalCases}
                </Typography>
                New cases:
                <Typography color="primary" variant="body1">
                  {todayCases}
                </Typography>
              </div>
            </CardContent>
          </Card>
          <Card className="card-info">
            <CardMedia className="card-media-info" title="Paella dish">
              <VerifiedUserOutlinedIcon
                color="secondary"
                className="info-icon"
              />
            </CardMedia>
            <CardContent>
              <div className="text-info-">
                <Typography color="secondary" variant="h2">
                  {totalRecovered}
                </Typography>
                New Recovered:
                <Typography color="secondary" variant="body1">
                  {todayRecovered}
                </Typography>
              </div>
            </CardContent>
          </Card>
          <Card className="card-info">
            <CardMedia className="card-media-info" title="Paella dish">
              <ErrorOutlineOutlinedIcon color="error" className="info-icon" />
            </CardMedia>
            <CardContent>
              <div className="text-info-">
                <Typography color="error" variant="h2">
                  {totalDeaths}
                </Typography>
                New Deaths:
                <Typography color="error" variant="body1">
                  {todayDeaths}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </article>
  );
};

export default CountryCards;