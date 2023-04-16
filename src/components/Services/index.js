import React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import './style.css'


const Service = (props) => {
    
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  }; 
  const handleClick2 = () => {
    setOpen2(!open2);
  }; 
  const handleClick3 = () => {
    setOpen3(!open3);
  }; 
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  return(
        <div className="service-area section-padding">
            <div className="container">
                <div className="service-wrap">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="service-item">
                                <div className="service-title">
                                    <span>Under the Umbrela of</span>
                                    <h2>Ar-Rahman Islamic Community Center</h2>
                                    {/* <p>The Weekend School of the Islamic Center of Allah is committed to providing quality Islamic Education according to the Quran and the Sunnah of the Prophet Mohammed (Peace Be upon Him) to a diverse student population in the greater area.</p> */}
                                </div>
                                <List
                                  sx={{ width: '100%', bgcolor: 'background.paper' }}
                                  component="nav"
                                >
                                  <ListItemButton onClick={handleClick1}>
                                    <ListItemIcon>
                                      <MenuBookOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Acadamics" />
                                    {open1 ? <ExpandLess /> : <ExpandMore />}
                                  </ListItemButton>
                                  <Collapse in={open1} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Tadrees Ul Quran" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Quran Class" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Hadees Class" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Short Courses" />
                                      </ListItemButton>
                                    </List>
                                  </Collapse>

                                  <ListItemButton onClick={handleClick2}>
                                    <ListItemIcon>
                                      <PermMediaOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Media" />
                                    {open2 ? <ExpandLess /> : <ExpandMore />}
                                  </ListItemButton>
                                  <Collapse in={open2} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Khutbaat" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Al hadaya forum" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Saif o Qalam Media Production" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Gallery" />
                                      </ListItemButton>
                                    </List>
                                  </Collapse>

                                  <ListItemButton onClick={handleClick3}>
                                    <ListItemIcon>
                                      <GroupsOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Community" />
                                    {open3 ? <ExpandLess /> : <ExpandMore />}
                                  </ListItemButton>
                                  <Collapse in={open3} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Mohsineen Youth Club" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Kids Club" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Tayyebaat Women Corner" />
                                      </ListItemButton>
                                    </List>
                                  </Collapse>

                                  <ListItemButton onClick={handleClick4}>
                                    <ListItemIcon>
                                      <MedicalServicesOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Services" />
                                    {open4 ? <ExpandLess /> : <ExpandMore />}
                                  </ListItemButton>
                                  <Collapse in={open4} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Funeral Services" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Habib Blood bank" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="marriage institute" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="As-salam dastarkhwan(food bank)" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Orphan House" />
                                      </ListItemButton>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Musafir Khana" />
                                      </ListItemButton>
                                    </List>
                                  </Collapse>
                              </List>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service;