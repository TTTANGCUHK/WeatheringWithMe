import React from 'react';
import { Collapse } from "react-collapse";


class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.ReqElement = React.createRef();
        this.LocElement = React.createRef();
        this.UserElement = React.createRef();
    }
    handleClickR = () => {
        this.ReqElement.current.handleMenuClick();
    };
    handleClickL = () => {
        this.LocElement.current.handleMenuClick();
    };
    handleClickU = () => {
        this.UserElement.current.handleMenuClick();
    };

  render() {
    return (

        <div className="w-screen h-full min-h-screen bg-fixed bg-[url('../public/ss-scaled-2048x1152.jpg')]">                
        <div className="flex flex-row h-full min-h-screen opacity-90">
        <div className="flex-none basis-3/12 bg-white rounded m-5 h-fit sticky top-0">
            <div className="grid grid-rows-4 gap-3 m-3 h-full font-overpass font-bold text-md">
       
            <div onClick={this.handleClickR}><Menu name="Request Updated Data" anchor="#req"/></div>
            <div onClick={this.handleClickL}><Menu name="Location Data" anchor="#loc"/></div>
            <div onClick={this.handleClickU}><Menu name="User Data" anchor="#user"/></div>
            <div><Menu name="Log Out" anchor="#"/></div>

            </div>            
        </div>
        <div className="flex-auto bg-white rounded mr-5 mt-5 mb-5">
            <Request ref={this.ReqElement}/>
            <LocationData ref={this.LocElement}/>
            <UserData ref={this.UserElement}/>
        </div>

   

        </div>

        </div>
    
    );
    }
    }

    class Menu extends React.Component {
        render(){
            return(
                <div className="rounded bg-gradient-to-r from-indigo-500 to-cyan-300 hover:from-purple-500 hover:to-rose-500 w-full p-0.5">
                <a className="rounded w-full bg-white p-2 text-slate-600 h-full text-center" type="button" href={this.props.anchor}>{this.props.name}</a>
                </div>
            );
        }
    }

    class CollapseSession extends React.Component {
        state = {
            collapseOpen: false,
          };

        onCollapse = () => {
            this.setState(prevState => ({
              collapseOpen: !prevState.collapseOpen,
            }));
        };
        onMenu = () => {
            this.setState({collapseOpen: true});
        };
        render() {
            return(
                <div className="m-3" id={this.props.session}>
                    <div className="rounded bg-gradient-to-r to-indigo-500 from-cyan-300 hover:from-purple-500 hover:to-rose-500 w-full p-0.5 opacity-80 font-overpass text-xl font-bold">
                    <div className="rounded w-full bg-white p-2 h-full opacity-80 text-center" onClick={this.onCollapse}>{this.props.name}</div>
                    </div>

                    <Collapse isOpened={this.state.collapseOpen}>
                    {this.props.session === "req"
                    ? <ReqCollapse/>
                    : <>
                    {this.props.session === "loc"
                    ? <LocCollapse/>
                    : <UserCollapse/>
                    }
                    </>
                    }
                    </Collapse>


                    
                </div>
            );

        }
    }

    class ReqCollapse extends React.Component {
        render() {
            return (
                <div className="rounded w-full p-2 border-2 border-indigo-100 mt-2 mb-5">
                    <button className="bg-sky-600 hover:bg-sky-400 rounded p-1 font-overpass text-white px-2" type="button">Reload Data</button>
                    <div className="text-xs font-overpass mt-0.5">Last updated: </div>
                </div>
            );
        }
    }

    class Request extends React.Component {
        constructor(props) {
            super(props);
            this.ReqElement = React.createRef();
        }
        handleMenuClick = () => {
            this.ReqElement.current.onMenu();
        }
        render(){
            return(
                <CollapseSession ref={this.ReqElement} name="Request Updated Data" session="req"/>
            );
        }
    }

    class LocCollapse extends React.Component {
        render() {
            return (
                <div className="rounded w-full p-2 border-2 border-indigo-100 mt-2 mb-5">

                    <div className="columns-4 mb-3 mx-1 mt-1">                        

                    <div className="rounded-t w-24 bg-sky-600 text-white text-center font-overpass p-1 px-2">CREATE</div>
                    <div className="border rounded-b p-2 font-overpass">
                        <form>
                        <label className="block text-sm font-bold" name="name">Name</label>
                        <input className="w-full py-1 border rounded px-1" id="name" type="text" />

                        <label className="block text-sm mt-2 font-bold" name="latitude">Latitude</label>
                        <input className="w-full py-1 border rounded px-1" id="latitude" type="text" />

                        <label className="block text-sm mt-2 font-bold" name="longtitude">Longtitude</label>
                        <input className="w-full py-1 border rounded px-1" id="longtitude" type="text" />

                        <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2" type="submit">CREATE</button>
                        </form>
                    </div>

                    <div className="rounded-t w-24 bg-sky-600 text-white text-center font-overpass p-1 px-2 mt-3">UPDATE</div>
                    <div className="border rounded-b p-2 font-overpass">
                        <form>
                        <label className="block text-sm font-bold" name="name">Name</label>
                        <input className="w-full py-1 border rounded px-1" id="name" type="text" />

                        <label className="block text-sm mt-2 font-bold" name="latitude">Latitude</label>
                        <input className="w-full py-1 border rounded px-1" id="latitude" type="text" />

                        <label className="block text-sm mt-2 font-bold" name="longtitude">Longtitude</label>
                        <input className="w-full py-1 border rounded px-1" id="longtitude" type="text" />

                        <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2" type="submit">UPDATE</button>
                        </form>
                    </div>

                    <div className="rounded-t w-24 bg-sky-600 text-white text-center font-overpass p-1 px-2">RETRIEVE</div>
                    <div className="border rounded-b p-2 font-overpass">
                        <form>
                        <label className="block text-sm font-bold" name="name">Name</label>
                        <input className="w-full py-1 border rounded px-1" id="name" type="text" />

                        <label className="block text-sm mt-2 font-bold" name="latitude">Latitude</label>
                        <input className="w-full py-1 border rounded px-1" id="latitude" type="text" />

                        <label className="block text-sm mt-2 font-bold" name="longtitude">Longtitude</label>
                        <input className="w-full py-1 border rounded px-1" id="longtitude" type="text" />

                        <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-3 text-white text-center font-overpass mt-2" type="submit">RETRIEVE</button>
                        </form>
                    </div>

                    <div className="rounded-t w-24 bg-sky-600 text-white text-center font-overpass p-1 px-2 mt-3">DELETE</div>
                    <div className="border rounded-b p-2 font-overpass">
                        <form>
                        <label className="block text-sm font-bold" name="name">Name</label>
                        <input className="w-full py-1 border rounded px-1" id="name" type="text" />

                        <label className="block text-sm mt-2 font-bold" name="latitude">Latitude</label>
                        <input className="w-full py-1 border rounded px-1" id="latitude" type="text" />

                        <label className="block text-sm mt-2 font-bold" name="longtitude">Longtitude</label>
                        <input className="w-full py-1 border rounded px-1" id="longtitude" type="text" />

                        <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2" type="submit">DELETE</button>
                        </form>
                    </div>

                    </div>

                    <table className="table-fixed border-collapse border mx-auto w-full ">
                        <thead>
                            <tr className="bg-slate-100 text-slate-500">
                                <th>Name</th>
                                <th>Latitude</th>
                                <th>Longtitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-slate-700">
                                <th>01</th>
                                <th>02</th>
                                <th>03</th>
                            </tr>
                            <tr className="text-slate-700 border">
                                <th>01</th>
                                <th>02</th>
                                <th>03</th>
                            </tr>
                        </tbody>

                    </table>
                    </div>
            );
        }
    }

    class LocationData extends React.Component {
        constructor(props) {
            super(props);
            this.ReqElement = React.createRef();
        }
        handleMenuClick = () => {
            this.ReqElement.current.onMenu();
        }
        render(){
            return(
                <CollapseSession ref={this.ReqElement} name="Location Data" session="loc"/>
            );
        }
    }

    class UserCollapse extends React.Component {

        state = {
            rusername: '',
            rpassword: ''
        };

        handleCreate = async (event) => {
            event.preventDefault()
            const data = {
                username: event.target.name.value.trim(),
                password: event.target.password.value
            }
            const postTo = "../api/user/createUser"
            const opts = {
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                mode: 'cors',
                body: new URLSearchParams(data)
            }
            const res = await fetch(postTo, opts)
            const result = await res.json()
            if (result.status === "200") {
                alert("You have created an account successfully!")
            } else if (result.status === "403") {
                alert("Account already exist!")
            }
        }

        handleUpdate = async (event) => {
            event.preventDefault()
            const data = {
                username: event.target.name.value.trim(),
                password: event.target.password.value
            }
            const postTo = "../api/user/updateUser"
            const opts = {
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                mode: 'cors',
                body: new URLSearchParams(data)
            }
            const res = await fetch(postTo, opts)
            const result = await res.json()
            if (result.status === "200") {
                alert("You have updated an account successfully!")
            } else if (result.status === "404") {
                alert("Account does not exist!")
            }
        }

        handleRetrieve = async (event) => {
            event.preventDefault()
            const data = {
                username: event.target.name.value.trim()
            }
            const postTo = "../api/user/retrieveUser"
            const opts = {
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                mode: 'cors',
                body: new URLSearchParams(data)
            }
            const res = await fetch(postTo, opts)
            const result = await res.json()
            if (result.status === "200") {
                alert("You have retrieved an account password successfully!")
                this.setState({rusername: data.username, rpassword: result.msg})
            } else if (result.status === "404") {
                alert("Account does not exist!")
            }
        }

        handleDelete = async (event) => {
            event.preventDefault()
            const data = {
                username: event.target.name.value.trim()
            }
            const postTo = "../api/user/deleteUser"
            const opts = {
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                mode: 'cors',
                body: new URLSearchParams(data)
            }
            const res = await fetch(postTo, opts)
            const result = await res.json()
            if (result.status === "200") {
                alert("You have deleted an account successfully!")
            } else if (result.status === "404") {
                alert("Account does not exist!")
            }
        }

        render() {
            return (
                <div className="rounded w-full p-2 border-2 border-indigo-100 mt-2 mb-5">

                    <div className="columns-4 mb-3 mx-1 mt-1">  

                    <div>
                    <div className="rounded-t w-24 bg-sky-600 text-white text-center font-overpass p-1 px-2">CREATE</div>
                   
                    <div className="border rounded-b p-2 font-overpass">
                        <form onSubmit={this.handleCreate}>
                        <label className="block text-sm font-bold" name="name">Username</label>
                        <input className="w-full py-1 border rounded px-1 mb-0.5" id="name" type="text" />
                        <label className="block text-sm font-bold" name="password">Password</label>
                        <input className="w-full py-1 border rounded px-1" id="password" type="text" />

                        <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2" type="submit">CREATE</button>
                        </form>
                    </div>

                    </div>

                    <div>

                    <div className="rounded-t w-24 bg-sky-600 text-white text-center font-overpass p-1 px-2 mt-3">UPDATE</div>
                    
                    <div className="border rounded-b p-2 font-overpass">
                        <form onSubmit={this.handleUpdate}>
                        <label className="block text-sm font-bold" name="name">Username</label>
                        <input className="w-full py-1 border rounded px-1 mb-0.5" id="name" type="text" />
                        <label className="block text-sm font-bold" name="password">Password</label>
                        <input className="w-full py-1 border rounded px-1" id="password" type="text" />


                        <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2" type="submit">UPDATE</button>
                        </form>
                    </div>

                    </div>

                    <div>
                    <div className="rounded-t w-24 bg-sky-600 text-white text-center font-overpass p-1 px-2">RETRIEVE</div>
                    <div className="border rounded-b p-2 font-overpass">
                        <form onSubmit={this.handleRetrieve}>
                        <label className="block text-sm font-bold" name="name">Username</label>
                        <input className="w-full py-1 border rounded px-1" id="name" type="text" />

                        <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-3 text-white text-center font-overpass mt-2 mb-5" type="submit">RETRIEVE</button>
                        </form>
                    </div>
                    </div>

                    <div>

                    <div className="rounded-t w-24 bg-sky-600 text-white text-center font-overpass p-1 px-2 mt-3">DELETE</div>
                    <div className="border rounded-b p-2 font-overpass">
                        <form onSubmit={this.handleDelete}>
                        <label className="block text-sm font-bold" name="name">Username</label>
                        <input className="w-full py-1 border rounded px-1" id="name" type="text" />

                        <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2" type="submit">DELETE</button>
                        </form>
                    </div>
                    </div>
                    </div>

                    <table className="table-fixed border-collapse border mx-auto w-full ">
                        <thead>
                            <tr className="bg-slate-100 text-slate-500">
                                <th>Username</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-slate-700">
                                <th>{this.state.rusername}</th>
                                <th>{this.state.rpassword}</th>
                            </tr>
                        </tbody>

                    </table>
                    </div>
            );
        }
    }

    class UserData extends React.Component {
        constructor(props) {
            super(props);
            this.ReqElement = React.createRef();
        }
        handleMenuClick = () => {
            this.ReqElement.current.onMenu();
        }
        render(){
            return(
                <CollapseSession ref={this.ReqElement} name="User Data" session="user"/>
            );
        }
    }


export default AdminHome;
    


/*
1. Request updated data, i.e., reload from the online dataset, without affecting data which
does not come from API (e.g., user comments within your app)
2. CRUD stored location data (latlong and name) in the local database
3. CRUD user data (username and password only) in the local database
4. Log out as admin
*/
