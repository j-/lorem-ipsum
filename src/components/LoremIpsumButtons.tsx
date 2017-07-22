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
	highlighted: number | null;
}

export default class LoremIpsumButtons extends React.Component<Props, State> {
	state: State = {
		highlighted: null,
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
		const { units } = this.props;
		for (let i = 0; i < this.props.max; i++) {
			const className = classNames('LoremIpsumButtons-button pt-button', {
				'pt-intent-primary': highlighted !== null && highlighted >= i,
				'pt-icon-clipboard': highlighted === i,
			});
			const count = i + 1;
			const unit = count === 1 ?
				units.substring(0, units.length - 1) :
				units;
			const text = highlighted === i ? `Copy ${count} ${unit}` : '';
			buttons.push(
				<div className="LoremIpsumButtons-item" key={i}>
					<button
						type="button"
						className={className}
						onClick={() => this.handleButtonClick(i)}
						onMouseOver={() => this.setHighlighted(i)}
						onMouseOut={() => this.clearHighlighted()}
						onFocus={() => this.setHighlighted(i)}
						onBlur={() => this.clearHighlighted()}
						children={text}
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

	private setHighlighted (i: number) {
		this.setState(() => ({
			highlighted: i,
		}));
	}

	private clearHighlighted () {
		this.setState(() => ({
			highlighted: null,
		}));
	}
}
