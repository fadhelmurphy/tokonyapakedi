/* eslint-disable react/no-children-prop */
/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from "prop-types";
import TypeOne from "./type-1";
import TypeTwo from "./type-2";
import TypeThree from "./type-3";

const Template = [
	{
		id: "type-1",
		component: TypeOne,
	},
	{
		id: "type-2",
		component: TypeTwo,
	},
	{
		id: "type-3",
		component: TypeThree,
	},
];

const Mobile = ({
	type, show, title, children, zIndex, contentBackground, saveTitle, onBack, onHide, onReset, onSave, isEdit, message, width,
}) => (
	Template.filter((item) => item.id === type).map((style, idx) => (
		<style.component
			key={String(idx)}
			show={show}
			type={type}
			title={title}
			children={children}
			zIndex={zIndex}
			contentBackground={contentBackground}
			saveTitle={saveTitle}
			onBack={onBack}
			onHide={onHide}
			onReset={onReset}
			onSave={onSave}
			isEdit={isEdit}
			message={message}
			width={width}
		/>
	))
);

Mobile.propTypes = {
	type: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	message: PropTypes.string,
	isEdit: PropTypes.bool,
	children: PropTypes.any,
	zIndex: PropTypes.number.isRequired,
	contentBackground: PropTypes.string,
	saveTitle: PropTypes.string.isRequired,
	onBack: PropTypes.func,
	onHide: PropTypes.func,
	onReset: PropTypes.func,
	onSave: PropTypes.func,
	width: PropTypes.string,
};

export default Mobile;
