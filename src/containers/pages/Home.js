import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { CreateMenuComponent } from './../../components/pages/CreateMenuComponent';
//
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});
//
// export const CreateMenu = connect(mapStateToProps, mapDispatchToProps)(CreateMenuComponent);

// TODO: if we have the key store initialized
export const HomeScreen = ({ setup }) => (<Redirect to='/welcome' />)

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default { Home };
