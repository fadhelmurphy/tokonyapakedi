/* eslint-disable react/no-children-prop */
/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import PropTypes from "prop-types";
import TypeOne from "./type-1";
import TypeTwo from "./type-2";
import React from "react";

const Template = [
	{
		id: "type-1",
		component: TypeOne,
	},
	{
		id: "type-2",
		component: TypeTwo,
	},
];

const Desktop = ({
	type, show, title, children, zIndex, contentBackground, saveTitle, onBack, onHide, onReset, onSave, onSelect, isEdit, message, promoCode, width,
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
			promoCode={promoCode}
			width={width}
			onSelect={onSelect}
		/>
	))
);

Desktop.propTypes = {
	type: PropTypes.string.isRequired,
	show: PropTypes.bool,
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
	promoCode: PropTypes.string,
	width: PropTypes.string,
	onSelect: PropTypes.func,
};

export default Desktop;
