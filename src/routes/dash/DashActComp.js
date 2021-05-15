import React,{useEffect,useState,useContext} from 'react'
import Button from '@material-ui/core/Button';
import "./DashComp.css";
import moment from "moment";
import firebase from './../../base';
import Loading  from "../comp/Loading";
import { AuthContext } from "./../../Auth";
import GetUserPicComp from "../comp/GetUserPicComp";
import GetBlogData from "../comp/GetBlogData";

function DashActComp() {



    const [loading, setLoading] = useState(true);
    const [act_list, set_act_list] = useState([]);
    const {currentUser} = useContext(AuthContext);

	  useEffect(() => {

  
    const subscriber = firebase.firestore()
      .collection('users')
   .doc(currentUser.email)
   .collection("acts")
   .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const act_list_ = [];
  
        querySnapshot.forEach(doc => {
          
              act_list_.push({
                ...doc.data(),
                key: doc.id,
              });
                        
  
        });
  
  
        set_act_list(act_list_);
        setLoading(false);
        
              //
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, []); 

if(loading && !act_list){
  return(
    <Loading />
  )
}









  return (
    <div className="dash_comp">

      <div className="comp_heading">
        <h1>Activity</h1>
      </div>
      
      <div className="timeline_list">
      {act_list.map((item,index) => (


          <div>

              <div>
        			 {

                  item.blog_liked?
                     <div key={item.key} className="timeline">
                            <div className="act_user">
                              <GetUserPicComp img={true} user_email={item.user_email}/>
                              <GetUserPicComp name={true} user_email={item.user_email}/>
                              <div  className="row_blog_contain">
                                  <div className="row_blog_contain">
                                       <p> {item.act_text}</p>
                                      <GetBlogData blog_id={item.blog_id}/>
                                  </div>
                              </div>
                            </div>
                            <div className="row_data">
                                <p>{moment(item.timestamp).format("LLL")}</p>
                            </div>
                        </div>
                             :

                    <div>
                    </div>
               }

               </div>
               <div>
              {

                  item.product?
                     <div key={item.key} className="timeline">
                            <div className="act_user">
                              <GetUserPicComp img={true} user_email={item.user_email}/>
                              <GetUserPicComp name={true} user_email={item.user_email}/>
                              <div  className="row_blog_contain">
                                  <div className="row_blog_contain">
                                       <p> {item.act_text}</p>
                                  </div>
                              </div>
                            </div>
                            <div className="row_data">
                                <p>{moment(item.timestamp).format("LLL")}</p>
                            </div>
                        </div>
                             :

                    <div>
                    </div>
               }
        
                </div>

              
              <div>
              {

                  item.comment?
                     <div key={item.key} className="timeline">
                            <div className="act_user">
                              <GetUserPicComp img={true} user_email={item.user_email}/>
                              <GetUserPicComp name={true} user_email={item.user_email}/>
                              <div  className="row_blog_contain">
                                  <div className="row_blog_contain">
                                       <p> {item.act_text}</p>
                                  </div>
                              </div>
                            </div>
                            <div className="row_data">
                                <p>{moment(item.timestamp).format("LLL")}</p>
                            </div>
                        </div>
                             :

                    <div>
                    </div>
               }
        
                </div>
                 <div>
              {

                  item.review_product?
                     <div key={item.key} className="timeline">
                            <div className="act_user">
                              <GetUserPicComp img={true} user_email={item.user_email}/>
                              <GetUserPicComp name={true} user_email={item.user_email}/>
                              <div  className="row_blog_contain">
                                  <div className="row_blog_contain">
                                       <p> {item.act_text}</p>
                                  </div>
                              </div>
                            </div>
                            <div className="row_data">
                                <p>{moment(item.timestamp).format("LLL")}</p>
                            </div>
                        </div>
                             :

                    <div>
                    </div>
               }
        
                </div>

             
    
                


          </div>
			
       ))}

      </div>
    </div>
  )
}

export default DashActComp;