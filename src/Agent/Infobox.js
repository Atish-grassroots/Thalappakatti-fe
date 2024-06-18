import React, { useEffect, useState } from 'react';
import axios from 'axios';

const color = [
    "bg-teal",
    "bg-orange",
    "bg-green",
    "bg-indigo",
    "bg-pink",
    "bg-purple",
    "bg-light-blue",
    "bg-red",
    "bg-deep-purple",
    "bg-brown",
    "bg-deep-orange",
    "bg-amber",
    "bg-lime",
    "bg-light-green",
    "bg-cyan",
  ];

const InfoBox = ({tabNumber1}) => {
  const [data, setData] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(null); 

  const selectedColor = () => {
    const colorName = color[colorIndex % color.length];
    setColorIndex(colorIndex + 1);
    return colorName;
  };

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date().toISOString().split('T')[0];
      const url = `http://localhost:3001/api/callcount/${date}/${tabNumber1}`;
  
      try {
        const response = await axios.get(url);
        setData(response.data[0]);
        setLastRefresh(new Date());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    // Call fetchData immediately and then every 5 seconds
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // 5000 ms = 5 s
  
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [tabNumber1]);

  return (
    <>
    <div>
    {/* <div style={{marginRight: '0px', float: 'right', color: 'grey', fontSize: 'small', borderRadius: '35px', border: '1px solid #ccc', padding: '3px'}}>
      Last Refresh :: {lastRefresh && lastRefresh.toLocaleString()}
    </div> */}
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[0 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">call</i>
        </div>
        <div className="content">
          <div className="text">I/B Calls Arrived</div>
          <div className="number count-to" data-from="0" data-to={data.callarrived} data-speed="15" data-fresh-interval="20">{data.callarrived}</div>
        </div>
      </div>
    </div>

    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[1 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">message</i>
        </div>
        <div className="content">
          <div className="text">OOO Hours Call</div>
          <div className="number count-to" data-from="0" data-to={data.ooohourscalls} data-speed="15" data-fresh-interval="20">{data.ooohourscalls}</div>
        </div>
      </div>
    </div>

    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[2 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">email</i>
        </div>
        <div className="content">
          <div className="text">I/B Calls Offered</div>
          <div className="number count-to" data-from="0" data-to={data.callsoffered} data-speed="15" data-fresh-interval="20">{data.callsoffered}</div>
        </div>
      </div>
    </div>

    {/* <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[3 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">phone_enabled</i>
        </div>
        <div className="content">
          <div className="text">I/B Calls Answered</div>
          <div className="number count-to" data-from="0" data-to={data.callsanswered} data-speed="15" data-fresh-interval="20">{data.callsanswered}</div>
        </div>
      </div>
    </div> */}
    {/* <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[4 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">call_to_action</i>
        </div>
        <div className="content">
          <div className="text">I/B Calls in Queue</div>
          <div className="number count-to" data-from="0" data-to={data.queuecalls} data-speed="15" data-fresh-interval="20">{data.queuecalls}</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[5 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">group</i>
        </div>
        <div className="content">
          <div className="text">I/B Agent LiveCall</div>
          <div className="number count-to" data-from="0" data-to={data.livecalls} data-speed="15" data-fresh-interval="20">{data.livecalls}</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[6 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">fax</i>
        </div>
        <div className="content">
          <div className="text">I/B Ans Within SL</div>
          <div className="number count-to" data-from="0" data-to={data.callsansweredwithin20} data-speed="15" data-fresh-interval="20">{data.callsansweredwithin20}</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[7 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">phone_missed</i>
        </div>
        <div className="content">
          <div className="text">I/B IVR Aband</div>
          <div className="number count-to" data-from="0" data-to={data.callsabandonedonivr} data-speed="15" data-fresh-interval="20">{data.callsabandonedonivr}</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[8 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">ring_volume</i>
        </div>
        <div className="content">
          <div className="text">I/B Queue Aband</div>
          <div className="number count-to" data-from="0" data-to={data.callsabandonedonqueue} data-speed="15" data-fresh-interval="20">{data.callsabandonedonqueue}</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[9 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">support_agent</i>
        </div>
        <div className="content">
          <div className="text">Service Level(SL-20)</div>
          <div className="number count-to" data-from="0" data-to={data.servicelevel} data-speed="15" data-fresh-interval="20">{data.answerlevel ? `${(data.servicelevel).toFixed(2)} %` : ''}</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[10 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">transcribe</i>
        </div>
        <div className="content">
          <div className="text">Answer Level(SL-20)</div>
          <div className="number count-to" data-from="0" data-to={data.answerlevel} data-speed="15" data-fresh-interval="20">{data.answerlevel ? `${(data.answerlevel).toFixed(2)} %` : ''}</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[11 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">av_timer</i>
        </div>
        <div className="content">
          <div className="text">I/B AHT</div>
          <div className="number count-to" data-from="0" data-to={data.aht} data-speed="15" data-fresh-interval="20">{data.aht} secs</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[12 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">access_time</i>
        </div>
        <div className="content">
          <div className="text">Ans Within SL=10 s</div>
          <div className="number count-to" data-from="0" data-to={data.callsansweredwithin10} data-speed="15" data-fresh-interval="20">{data.callsansweredwithin10}</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[13 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">policy</i>
        </div>
        <div className="content">
          <div className="text">Service Level(SL-10)</div>
          <div className="number count-to" data-from="0" data-to={data.servicelevel_ten} data-speed="15" data-fresh-interval="20">{data.answerlevel ? `${(data.servicelevel_ten).toFixed(2)} %` : ''}</div>
        </div>
      </div>
    </div>
    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
     <div className={`info-box ${color[14 % color.length]} hover-expand-effect`}>
        <div className="icon">
          <i className="material-icons">contact_phone</i>
        </div>
        <div className="content">
          <div className="text">Answer Level(SL-10)</div>
          <div className="number count-to" data-from="0" data-to={data.answerlevel_ten} data-speed="15" data-fresh-interval="20">{data.answerlevel ? `${(data.answerlevel_ten).toFixed(2)} %` : ''}</div>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default InfoBox;