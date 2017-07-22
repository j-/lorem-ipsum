import * as React from 'react';
import * as classNames from 'classnames';
import './LoremIpsumButtons.css';

const copy = require('clipboard-copy');
const loremIpsum = require('lorem-ipsum');

export interface Props {
	units: 'words' | 'sentences' | 'paragraphs';
	max: number;
}

interface State {
	highlighted: number;
}

export default class LoremIpsumButtons extends React.Component<Props, State> {
	state: State = {
		highlighted: 0,
	};

	render () {
		const { units } = this.props;
		const className = classNames('LoremIpsumButtons', {
			'LoremIpsumButtons--words': units === 'words',
			'LoremIpsumButtons--sentences': units === 'sentences',
			'LoremIpsumButtons--paragraphs': units === 'paragraphs',
		});
		const buttons = this.renderButtons();
		return (
			<div className={className}>
				{buttons}
			</div>
		);
	}

	private renderButtons () {
		const buttons = [];
		const { highlighted } = this.state;
		for (let i = 0; i < this.props.max; i++) {
			const className = classNames('LoremIpsumButtons-button pt-button', {
				'pt-intent-primary': highlighted > i,
			});
			buttons.push(
				<div className="LoremIpsumButtons-item" key={i}>
					<button
						type="button"
						className={className}
						onClick={() => this.handleButtonClick(i)}
						onMouseOver={() => this.handleMouseOver(i)}
						onMouseOut={() => this.handleMouseOut()}
					/>
				</div>
			);
		}
		return buttons;
	}

	private handleButtonClick (i: number) {
		const { units } = this.props;
		const count = i + 1;
		const text = loremIpsum({
			count,
			units,
		});
		copy(text);
	}

	private handleMouseOver (i: number) {
		this.setState(() => ({
			highlighted: i + 1,
		}));
	}

	private handleMouseOut () {
		this.setState(() => ({
			highlighted: 0,
		}));
	}
}
