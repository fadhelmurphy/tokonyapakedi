/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";

const Input = ({
	value,
	label,
	placeholder,
	onChange,
	validation,
	ifNotValid
}) => (
	<div className="form-input-bs">
		{ifNotValid(validation)}
		{
			label && (
				<p className="label">{label}</p>
			)
		}
		<input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required />
		{validation && <p className="error">{`${label} must be filled`}</p>}
		<style jsx>
			{`
				.form-input-bs {
					padding: 0 0 10px 0;
					font-family: Poppins;
				}
				.form-input-bs p.label {
					margin: 0 0 5px 0;
					font-weight: 700;
					font-style: normal;
					font-size: 12px;
					line-height: 16px;
				}
				.form-input-bs p.error {
					margin: 4px 0;
					font-style: normal;
					font-size: 12px;
					line-height: 16px;
					color: #FF4D4F;
				}
				.form-input-bs input {
					width: 100%;
					box-sizing: border-box;
					height: 34px;
					border: 1px solid ${validation ? "red" : "#DFE3E8"};
					border-radius: 2px;
					outline: none;
					padding: 0 10px;
					font-weight: 400;
					font-style: normal;
					font-size: 14px;
					line-height: 22px;
					transition: all .3s ease;
				} 
				.form-input-bs input::placeholder {
					color: #919EAB;
				} 
				.form-input-bs input:focus,
				.form-input-bs input:hover {
					border: 1px solid #1B8884;
				} 
			`}
		</style>
	</div>
);

Input.propTypes = {
	value: PropTypes.any,
	label: PropTypes.any,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	validation: PropTypes.bool,
	ifNotValid: PropTypes.func,
};

Input.defaultProps = {
	placeholder: "please type ...",
	ifNotValid: () => {}
};

export default Input;
