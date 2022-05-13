import React, { setState } from 'react';
import { Collapse } from "react-collapse";
import Router from "next/router";
import axios from 'axios';
import fetchWeatherAPI from '../../backend/dataFetch/fetchAPI';
import { signOut } from "next-auth/react";
import { Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

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

    // handleLogout = () => {
    //     if (typeof window !== 'undefined') {
    //         signOut({ callbackUrl: 'http://localhost:3000/form' })
    //     }
    // }

    render() {
        return (

            <div className="w-full min-h-screen bg-fixed bg-[url('../public/ss-scaled-2048x1152.jpg')]">
                <div className="flex flex-row h-full min-h-screen opacity-90">
                    <div className="flex-none basis-3/12 bg-white rounded m-5 h-fit sticky top-0">
                        <div className="grid grid-rows-3 gap-3 m-3 h-full font-overpass font-bold text-md">

                            <div onClick={this.handleClickR}><Menu name="Request Updated Data" anchor="#req" /></div>
                            <div onClick={this.handleClickL}><Menu name="Location Data" anchor="#loc" /></div>
                            <div onClick={this.handleClickU}><Menu name="User Data" anchor="#user" /></div>

                        </div>
                    </div>
                    <div className="flex-auto bg-white rounded mr-5 mt-5 mb-5">
                        <Request ref={this.ReqElement} />
                        <LocationData ref={this.LocElement} />
                        <UserData ref={this.UserElement} />
                    </div>



                </div>

            </div>

        );
    }
}

class Menu extends React.Component {
    render() {
        return (
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
        this.setState({ collapseOpen: true });
    };
    render() {
        return (
            <div className="m-3" id={this.props.session}>
                <div className="rounded bg-gradient-to-r to-indigo-500 from-cyan-300 hover:from-purple-500 hover:to-rose-500 w-full p-0.5 opacity-80 font-overpass text-xl font-bold">
                    <div className="rounded w-full bg-white p-2 h-full opacity-80 text-center" onClick={this.onCollapse}>{this.props.name}</div>
                </div>

                <Collapse isOpened={this.state.collapseOpen}>
                    {this.props.session === "req"
                        ? <ReqCollapse />
                        : <>
                            {this.props.session === "loc"
                                ? <LocCollapse />
                                : <UserCollapse />
                            }
                        </>
                    }
                </Collapse>



            </div>
        );

    }
}

class ReqCollapse extends React.Component {

    RequestWeatherData() {
        axios.post("/api/location", { action: 'updateAll', payload: ' ' }).then(res => document.getElementById('lastUpdate').innerText = "Last updated: " + res.data.msg)
    }

    render() {
        return (
            <div className="rounded w-full p-2 border-2 border-indigo-100 mt-2 mb-5">
                <button className="bg-sky-600 hover:bg-sky-400 rounded p-1 font-overpass text-white px-2" type="button" onClick={this.RequestWeatherData}>Reload Data</button>
                <div className="text-xs font-overpass mt-0.5" id="lastUpdate">Last updated: </div>
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
    render() {
        return (
            <CollapseSession ref={this.ReqElement} name="Request Updated Data" session="req" />
        );
    }
}

class LocCollapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            columns: [
                { field: 'locName', headerName: 'Location Name', width: 130, flex: 1 },
                { field: 'lat', headerName: 'Latitude', width: 130, flex: 1 },
                { field: 'lon', headerName: 'Longitude', width: 130, flex: 1 }
            ]
        }
    }

    handleCreate = e => {
        e.preventDefault()
        let name = document.getElementById("name").value
        let lat = document.getElementById("latitude").value
        let lon = document.getElementById("longitude").value
        if (name && lat && lon) {
            fetchWeatherAPI({ name: name }).then(async data => {
                axios.post("./api/location", {
                    action: "add",
                    payload: JSON.stringify({
                        "locationName": name,
                        "latitude": lat,
                        "longitude": lon,
                        "weatherData": {
                            "temp_c": data.data.current.temp_c,
                            "wind_kph": data.data.current.wind_kph,
                            "wind_dir": data.data.current.wind_dir,
                            "humidity": data.data.current.humidity,
                            "precip_mm": data.data.current.precip_mm,
                            "vis_km": data.data.current.vis_km
                        }
                    })
                }).then(res => {
                    alert('Location created!')
                }).catch(res => {
                    alert('Failed to create location (probably already exist)!')
                })
            }
            ).catch(err => {
                alert(err.response.data.error.message)
            })
        } else {
            alert('Fill in the location name to create new location!')
        }
    }

    handleUpdate = e => {
        e.preventDefault()
        let name = document.getElementById("name").value
        let lat = document.getElementById("latitude").value
        let lon = document.getElementById("longitude").value
        let _id = document.getElementById("_id").value
        if (name && lat && lon && _id) {
            fetchWeatherAPI({ name: name }).then(async data => {
                axios.post("./api/location", {
                    action: "update",
                    payload: JSON.stringify({
                        "locationName": name,
                        "latitude": lon,
                        "longitude": lat,
                        "weatherData": {
                            "temp_c": data.data.current.temp_c,
                            "wind_kph": data.data.current.wind_kph,
                            "wind_dir": data.data.current.wind_dir,
                            "humidity": data.data.current.humidity,
                            "precip_mm": data.data.current.precip_mm,
                            "vis_km": data.data.current.vis_km
                        },
                        "_id": _id
                    })
                }).then(res => {
                    alert('Location updated!')
                }).catch(res => {
                    alert('Failed to update location!')
                })
            }
            ).catch(err => {
                alert(err.response.data.error.message)
            })
        } else {
            alert('Fill in the location information to update location!')
        }
    }

    handleDelete(e) {
        e.preventDefault()
        let name = document.getElementById("name").value
        let lat = document.getElementById("latitude").value
        let lon = document.getElementById("longitude").value
        let _id = document.getElementById("_id").value
        if (_id) {
            axios.post('/api/location', { action: 'delete', payload: _id })
                .then(res => alert("Location deleted!"))
                .catch(res => alert("Failed to delete location!"))
        } else {
            alert('Fill in the location name to delete location!')
        }
    }

    handleRequest = async e => {
        e.preventDefault()
        // let name = document.getElementById("name").value
        // if (name) {
        //     axios.post('/api/location', { action: 'getIdByName', payload: name })
        //         .then(res => axios.post('/api/location', { action: 'get', payload: res.data._id })
        //             .then(res => alert(JSON.stringify(res.data))))
        //         .catch(res => alert("Cannot find location in database"))
        // }
        let locations = (await axios
            .post("/api/location", {
                action: "get",
                payload: 'all',
            })).data
        this.setState({
            locations: locations,
            columns: [
                { field: 'locName', headerName: 'Location Name', width: 130, flex: 1 },
                { field: 'lat', headerName: 'Latitude', width: 130, flex: 1 },
                { field: 'lon', headerName: 'Longitude', width: 130, flex: 1 }
            ]
        })

    }

    handleCellClick = e => {
        document.getElementById('name').value = e.row.locName
        document.getElementById('latitude').value = e.row.lat
        document.getElementById('longitude').value = e.row.lon
        document.getElementById('_id').value = e.row._id
    }

    render() {
        return (
            <div className="rounded w-full p-2 border-2 border-indigo-100 mt-2 mb-5">

                <div className="columns mb-3 mx-1 mt-1">

                    <div className="rounded-t w-24 bg-sky-600 text-white text-center font-overpass p-1 px-2">Location</div>
                    <div className="border rounded-b p-2 font-overpass">
                        <p>First Click the request button, to get all the location data</p>
                        <p>Click on a specific entry to apply CRUD operation, input field will be auto filled</p>
                        <p>Edit the name, latitude or longtitude</p>
                        <p>Click create to create a new location base on the given information</p>
                        <p>Click update to update the selected entry base on the given information</p>
                        <p>Click delete to deleted the selected entry</p>
                        <form>
                            <label className="block text-sm font-bold" name="name">Location Name</label>
                            <input className="w-full py-1 border rounded px-1" id="name" type="text" />
                            <label className="block text-sm font-bold" name="latitude">Latitude</label>
                            <input className="w-full py-1 border rounded px-1" id="latitude" type="text" />
                            <label className="block text-sm font-bold" name="longtitude">Longtitude</label>
                            <input className="w-full py-1 border rounded px-1" id="longitude" type="text" />
                            <label className="block text-sm font-bold" name="_id">_id</label>
                            <input className="w-full py-1 border rounded px-1" id="_id" type="text" readOnly />

                            <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2 mx-1" type="submit" onClick={this.handleCreate}>CREATE</button>
                            <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2 mx-1" type="submit" onClick={this.handleUpdate}>UPDATE</button>
                            <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2 mx-1" type="submit" onClick={this.handleDelete}>DELETE</button>
                            <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2 mx-1" type="submit" onClick={this.handleRequest}>REQUEST</button>
                        </form>
                    </div>
                </div>
                <div style={{ height: '700px', width: '100%' }}>
                    <DataGrid
                        rows={
                            this.state.locations
                                .map((location, idx) => {
                                    return {
                                        id: idx, locName: location.locData.name,
                                        lat: location.locData.latitude,
                                        lon: location.locData.longitude,
                                        _id: location._id
                                    }
                                }
                                )
                        }
                        columns={this.state.columns}
                        pageSize={100}
                        rowsPerPageOptions={[100]}
                        components={{ Toolbar: GridToolbar }}
                        onCellClick={this.handleCellClick}
                    />
                </div>
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
    render() {
        return (
            <CollapseSession ref={this.ReqElement} name="Location Data" session="loc" />
        );
    }
}

class UserCollapse extends React.Component {

    state = {
        rusername: '',
        rpassword: '',
        rsalt: ''
    };

    handleCreate = async (event) => {
        event.preventDefault()
        const data = {
            username: event.target.parentElement.name.value.trim(),
            password: event.target.parentElement.password.value
        }
        const postTo = "../api/user/createUser"
        const opts = {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
            username: event.target.parentElement.name.value.trim(),
            password: event.target.parentElement.password.value
        }
        const postTo = "../api/user/updateUser"
        const opts = {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
            username: event.target.parentElement.name.value.trim()
        }
        const postTo = "../api/user/retrieveUser"
        const opts = {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            mode: 'cors',
            body: new URLSearchParams(data)
        }
        const res = await fetch(postTo, opts)
        const result = await res.json()
        if (result.status === "200") {
            alert("You have retrieved an account password successfully!")
            this.setState({ rusername: data.username, rpassword: result.msg.userPW, rsalt: result.msg.userSALT })
        } else if (result.status === "404") {
            alert("Account does not exist!")
        }
    }

    handleDelete = async (event) => {
        event.preventDefault()
        const data = {
            username: event.target.parentElement.name.value.trim()
        }
        const postTo = "../api/user/deleteUser"
        const opts = {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
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

                <div className="columns-2 mb-3 mx-1 mt-1">

                    <div>
                        <div className="rounded-t w-36 bg-sky-600 text-white text-center font-overpass p-1 px-2">CREATE/UPDATE</div>

                        <div className="border rounded-b p-2 font-overpass">
                            <form>
                                <p>Create: Create an new user with the given username and password</p>
                                <p>Update: Update an existing user with the given username and password</p>
                                <label className="block text-sm font-bold" name="name">Username</label>
                                <input className="w-full py-1 border rounded px-1 mb-0.5" id="name" type="text" />
                                <label className="block text-sm font-bold" name="password">Password</label>
                                <input className="w-full py-1 border rounded px-1" id="password" type="text" />

                                <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2" type="submit" onClick={this.handleCreate}>CREATE</button>
                                <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2" type="submit" onClick={this.handleUpdate}>UPDATE</button>
                            </form>
                        </div>

                    </div>

                    <div>
                        <div className="rounded-t w-48 bg-sky-600 text-white text-center font-overpass p-1 px-2">RETRIEVE/DELETE</div>

                        <div className="border rounded-b p-2 font-overpass">
                            <form>
                                <p>Retrieve: Retrieve an existing user's username, password and salt</p>
                                <p>Delete: Delete an existing user</p>
                                <label className="block text-sm font-bold" name="name">Username</label>
                                <input className="w-full py-1 border rounded px-1" id="name" type="text" />

                                <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-3 text-white text-center font-overpass mt-2 mb-5" type="submit" onClick={this.handleRetrieve}>RETRIEVE</button>
                                <button className="rounded bg-sky-600 hover:bg-sky-400 py-1 px-5 text-white text-center font-overpass mt-2" type="submit" onClick={this.handleDelete}>DELETE</button>
                            </form>
                        </div>
                    </div>

                </div>

                <table className="table-fixed border-collapse border mx-auto w-full ">
                    <thead>
                        <tr className="bg-slate-100 text-slate-500">
                            <th>Username</th>
                            <th>Password</th>
                            <th>Salt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-slate-700">
                            <th style={{ 'word-wrap': 'break-word' }}>{this.state.rusername}</th>
                            <th style={{ 'word-wrap': 'break-word' }}>{this.state.rpassword}</th>
                            <th style={{ 'word-wrap': 'break-word' }}>{this.state.rsalt}</th>
                        </tr>
                    </tbody>

                </table>
            </div >
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
    render() {
        return (
            <CollapseSession ref={this.ReqElement} name="User Data" session="user" />
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
