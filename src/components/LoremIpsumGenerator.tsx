import * as React from 'react';
import { NumericInput } from '@blueprintjs/core';
import toaster from '../toaster';
import './LoremIpsumGenerator.css';

const copy = require('clipboard-copy');
const loremIpsum = require('lorem-ipsum');

interface State {
	count: number;
	units: 'words' | 'sentences' | 'paragraphs';
	sentenceLowerBound: number;
	sentenceUpperBound: number;
	paragraphLowerBound: number;
	paragraphUpperBound: number;
	format: 'html' | 'plain';
}

export default class LoremIpsumGenerator extends React.Component<{}, State> {
	state: State = {
		count: 1,
		units: 'sentences',
		sentenceLowerBound: 5,
		sentenceUpperBound: 15,
		paragraphLowerBound: 3,
		paragraphUpperBound: 7,
		format: 'plain',
	};

	render () {
		return (
			<form className="LoremIpsumGenerator" onSubmit={this.handleSubmit}>
				<div className="LoremIpsumGenerator-config">
					<div className="pt-form-group">
						<label className="pt-label" htmlFor="config-count">Count</label>
						<div className="pt-form-content">
							<NumericInput
								id="config-count"
								className="pt-fill"
								min={1}
								value={this.state.count}
								onValueChange={(value) => this.setValue('count', value)}
							/>
						</div>
					</div>

					<div className="pt-form-group">
						<label className="pt-label" htmlFor="config-units">Units</label>
						<div className="pt-form-content">
							<div className="pt-select pt-fill">
								<select
									id="config-units"
									value={this.state.units}
									onChange={(e) => this.setValue('units', e.currentTarget.value)}
								>
									<option value="words">Words</option>
									<option value="sentences">Sentences</option>
									<option value="paragraphs">Paragraphs</option>
								</select>
							</div>
						</div>
					</div>

					<div className="pt-form-group">
						<label className="pt-label" htmlFor="config-sentence-lower">Sentence lower bound</label>
						<div className="pt-form-content">
							<NumericInput
								id="config-sentence-lower"
								className="pt-fill"
								min={1}
								value={this.state.sentenceLowerBound}
								onValueChange={(value) => this.setValue('sentenceLowerBound', value)}
							/>
						</div>
					</div>

					<div className="pt-form-group">
						<label className="pt-label" htmlFor="config-sentence-upper">Sentence upper bound</label>
						<div className="pt-form-content">
							<NumericInput
								id="config-sentence-upper"
								className="pt-fill"
								min={1}
								value={this.state.sentenceUpperBound}
								onValueChange={(value) => this.setValue('sentenceUpperBound', value)}
							/>
						</div>
					</div>

					<div className="pt-form-group">
						<label className="pt-label" htmlFor="config-paragraph-lower">Paragraph lower bound</label>
						<div className="pt-form-content">
							<NumericInput
								id="config-paragraph-lower"
								className="pt-fill"
								min={1}
								value={this.state.paragraphLowerBound}
								onValueChange={(value) => this.setValue('paragraphLowerBound', value)}
							/>
						</div>
					</div>

					<div className="pt-form-group">
						<label className="pt-label" htmlFor="config-paragraph-upper">Paragraph upper bound</label>
						<div className="pt-form-content">
							<NumericInput
								id="config-paragraph-upper"
								className="pt-fill"
								min={1}
								value={this.state.paragraphUpperBound}
								onValueChange={(value) => this.setValue('paragraphUpperBound', value)}
							/>
						</div>
					</div>

					<div className="pt-form-group">
						<div className="pt-form-content">
							<label className="pt-control pt-checkbox" htmlFor="config-html">
								<input
									id="config-html"
									type="checkbox"
									checked={this.state.format === 'html'}
									onChange={(e) => this.setValue('format', e.currentTarget.checked ? 'html' : 'plain')}
								/>
								<span className="pt-control-indicator" />
								Format as HTML
							</label>
						</div>
					</div>
				</div>

				<button
					type="submit"
					className="pt-button pt-fill pt-intent-primary"
				>
					Copy to clipboard
				</button>
			</form>
		);
	}

	private generateLoremIpsum () {
		return loremIpsum({
			count: this.state.count,
			units: this.state.units,
			sentenceLowerBound: this.state.sentenceLowerBound,
			sentenceUpperBound: this.state.sentenceUpperBound,
			paragraphLowerBound: this.state.paragraphLowerBound,
			paragraphUpperBound: this.state.paragraphUpperBound,
			format: this.state.format,
		});
	}

	private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const text = this.generateLoremIpsum();
		copy(text);
		toaster.show({
			message: 'Copied to clipboard',
		});
	}

	private setValue = (key: keyof State, value: string | number) => {
		this.setState(() => ({
			[key]: value,
		}));
	}
}
