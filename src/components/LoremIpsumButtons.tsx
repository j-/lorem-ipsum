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
		for (let i = 0; i < this.props.max; i++) {
			buttons.push(
				<div className="LoremIpsumButtons-item" key={i}>
					<button
						type="button"
						className="LoremIpsumButtons-button pt-button"
						onClick={() => this.handleButtonClick(i + 1)}
					/>
				</div>
			);
		}
		return buttons;
	}

	private handleButtonClick (count: number) {
		const { units } = this.props;
		const text = loremIpsum({
			count,
			units,
		});
		copy(text);
	}
}
