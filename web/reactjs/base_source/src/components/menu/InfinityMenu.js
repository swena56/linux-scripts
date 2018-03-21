import PropTypes from "prop-types";
import React from "react";
import SearchInput from "./SearchInput";
import NestedObjects from "nested-objects";
import _get from "lodash.get";
import "./InfinityMenu.css";


/*
 *  @class InfinityMenu
 */
export default class InfinityMenu extends React.Component {
	/*
	 *  @constructs InfinityMenu
	 */
	constructor(props) {
		super(props);
		this.state = {
			search: {
				isSearching: false,
				searchInput: ""
			}
		};
		this.setSearchInput = this.setSearchInput.bind(this);
		this.stopSearching = this.stopSearching.bind(this);
		this.startSearching = this.startSearching.bind(this);
	}
	/*
	 *	@function onNodeClick
	 *	@description open or close folder
	 *
	 *	@param {string} folder - key name of folder object
	 */
	onNodeClick(tree, node, keyPath, event) {
		event.preventDefault();
		if (!this.state.search.isSearching || !this.state.search.searchInput.length) {
			node.isOpen = !node.isOpen;
			node.maxLeaves = this.props.maxLeaves;
			NestedObjects.set(tree, keyPath, node);
			if (this.props.onNodeMouseClick) {
				const currLevel = Math.floor(keyPath.split(".").length / 2);
				this.props.onNodeMouseClick(event, tree, node, currLevel, keyPath);
			}
		}
	}

	onLoadMoreClick(tree, node, keyPath, event) {
		event.preventDefault();
		// get parent node so we can increment it's unique max leaves property
		const keyPathArray = keyPath.split(".");
		const parentPath = Object.assign([],keyPathArray).splice(0, keyPathArray.length - 2);
		const parentNode = _get(this.props.tree, parentPath);
		// set new max leaves - if none exist use component default property
		parentNode.maxLeaves = (!parentNode.maxLeaves) ? this.props.maxLeaves : parentNode.maxLeaves + this.props.maxLeaves;
		if (this.props.onNodeMouseClick) {
			const currLevel = Math.floor(keyPath.split(".").length / 2);
			this.props.onNodeMouseClick(event, tree, node, currLevel, keyPath);
		}
	}
	/*
	* @function shouldComponentUpdate
	* @returns {boolean} return based on user pass in shouldComponentUpdate or return true
	*/
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.shouldComponentUpdate) {
			return nextProps.shouldComponentUpdate(this.props, this.state, nextProps, nextState);
		}
		else {
			return true;
		}
	}
	/*
	 *	@function startSearching
	 *	@description when not searching and search icon clicked, set state to start
	 */
	startSearching() {
		this.setState({
			search: {
				isSearching: true,
				searchInput: ""
			}
		});
	}
	/*
	 *	@function stopSearching
	 *	@description when searching and close icon clicked, set state to stop
	 */
	stopSearching() {
		this.setState({
			search: {
				isSearching: false,
				searchInput: ""
			}
		});
	}
	/*
	 *	@function setSearchInput
	 *	@description when user types in search input, set phrase in state for filter
	 */
	setSearchInput(event) {
		this.setState({
			search: {
				isSearching: true,
				searchInput: event.target.value
			}
		});
	}

	findFiltered(trees, node, key) {
		if (!node.children) {
			const nodeMatchesSearchFilter = this.props.filter(node, this.state.search.searchInput);
			if (nodeMatchesSearchFilter) {
				node.isSearchDisplay = true;
				trees[key] = node;
				return trees;
			}
			else {
				node.isSearchDisplay = false;
				trees[key] = node;
				return trees;
			}
		}
		else {
			const filteredSubFolder = node.children.length ? node.children.reduce((p, c, k) => {
				return this.findFiltered(p, c, k);
			}, []) : [];
			const shouldDisplay = filteredSubFolder.some(child => child.isSearchDisplay);

			if (shouldDisplay) {
				node.isSearchOpen = true;
				node.children = filteredSubFolder;
				node.isSearchDisplay = true;
				node.maxLeaves = (node.maxLeaves) ? node.maxLeaves : this.props.maxLeaves;
				trees[key] = node;
				return trees;
			}
			else {
				node.isSearchOpen = false;
				node.isSearchDisplay = false;
				trees[key] = node;
				return trees;
			}
		}
	}

	/*
	 *	@function setDisplayTree
	 *	@description recursive go through the tree and set the render tree
	 *
	 *	@param {array} tree - whole tree
	 *	@param {array} prevs - the whole rendering array
	 *	@param {object} curr - current node/leaf
	 *	@param {string} keyPath - the path to current node/leaf, e.g.  "0.children.1"
	 */
	setDisplayTree(tree, prevs, curr, keyPath) {
		const currLevel = Math.floor(keyPath.length / 2);
		const currCustomComponent = typeof curr.customComponent === "string" ? this.props.customComponentMappings[curr.customComponent] : curr.customComponent;
		const currCustomloadMoreComponent = (this.props.loadMoreComponent) ? this.props.loadMoreComponent : null;
		const isSearching = this.state.search.isSearching && this.state.search.searchInput;
		const shouldDisplay = (isSearching && curr.isSearchDisplay) || !isSearching;
		curr.keyPath = keyPath;

		/*the leaves*/
		if (!curr.children) {
			const keyPathArray = keyPath.split(".");
			const parentPath = Object.assign([],keyPathArray).splice(0, keyPathArray.length - 2);
			const parentNode = _get(this.props.tree, parentPath);
			const filteredChildren = (
				parentNode.children.some(child => child.isSearchDisplay === true)
				?
				parentNode.children.filter(child => child.isSearchDisplay === true)
				:
				parentNode.children
			);
			const itemKey = "infinity-menu-leaf-" + curr.id;
			const visIds = filteredChildren.map((e) => e.id);

			let relativeIndex = visIds.indexOf(curr.id);
			relativeIndex = (relativeIndex === -1) ? Infinity : relativeIndex;

			let parentMaxLeaves = parentNode.maxLeaves || this.props.maxLeaves;
			if (shouldDisplay && parentMaxLeaves > relativeIndex ) {
				if (curr.customComponent) {
					const componentProps = {
						key: itemKey,
						onMouseDown: (e) => {
							this.props.onLeafMouseDown ? this.props.onLeafMouseDown(e, curr) : null;
						},
						onMouseUp: (e) => {
							this.props.onLeafMouseUp ? this.props.onLeafMouseUp(e, curr) : null;
						},
						onClick: (e) => {
							this.props.onLeafMouseClick ? this.props.onLeafMouseClick(e, curr) : null;
						},
						name: curr.name,
						icon: curr.icon,
						data: curr
					};
					prevs.push(React.createElement(currCustomComponent, componentProps));
				}
				else {
					prevs.push(
						<li key={itemKey}
							className="infinity-menu-leaf-container"
							onMouseDown={(e) => this.props.onLeafMouseDown ? this.props.onLeafMouseDown(e, curr) : null}
							onMouseUp={(e) => this.props.onLeafMouseUp ? this.props.onLeafMouseUp(e, curr) : null}
							onClick={(e) => this.props.onLeafMouseClick ? this.props.onLeafMouseClick(e, curr) : null}
							>
							<span>{curr.name}</span>
						</li>
					);
				}
			}
			else {
				if (relativeIndex === filteredChildren.length - 1) {
					if (currCustomloadMoreComponent) {
						const loadMoreProps = {
							key: itemKey,
							onClick: this.onLoadMoreClick.bind(this, tree, curr, keyPath)
						};
						prevs.push(React.createElement(currCustomloadMoreComponent, loadMoreProps));
					}
					else {
						prevs.push(
							<li key={itemKey}
								className="infinity-menu-load-more-container"
								onClick={this.onLoadMoreClick.bind(this, tree, curr, keyPath)}
							>
								<span>Load more</span>
							</li>
						);
					}
				}
			}
			return prevs;
		}
		/*the node*/
		else {
			const key = "infinity-menu-node-" + currLevel + "-" + curr.id;
			const nodeName = curr.name;
			if ((!curr.isOpen && !isSearching) || (!curr.isSearchOpen && isSearching)) {
				if (shouldDisplay) {
					if (curr.customComponent) {
						const nodeProps = {
							onClick: this.onNodeClick.bind(this, tree, curr, keyPath),
							name: nodeName,
							isOpen: curr.isOpen,
							isSearching: false,
							data: curr,
							key
						};
						prevs.push(React.createElement(currCustomComponent, nodeProps));
					}
					else {
						prevs.push(
							<div key={key}
								onClick={this.onNodeClick.bind(this, tree, curr, keyPath)}
								className="infinity-menu-node-container"
							>
								<label>{nodeName}</label>
							</div>
						);
					}
				}
				return prevs;
			}
			else {
				let openedNode = [];
				if (shouldDisplay) {
					if (curr.customComponent) {
						const nodeProps = {
							onClick: this.onNodeClick.bind(this, tree, curr, keyPath),
							name: nodeName,
							isOpen: curr.isOpen,
							data: curr,
							key,
							isSearching
						};
						openedNode.push(React.createElement(currCustomComponent, nodeProps));
					}
					else {
						openedNode.push(
							<div key={key}
								onClick={this.onNodeClick.bind(this, tree, curr, keyPath)}
								className="infinity-menu-node-container"
							>
								<label>{nodeName}</label>
							</div>
						);
					}

					const childrenList = curr.children.length ? curr.children.reduce((p, c, k) => {
						if (c === undefined || k === undefined) {
							return p;
						}
						return this.setDisplayTree(tree, p, c, keyPath + ".children." + k);
					}, []) : [];


					if (childrenList.length > 0) {
						openedNode.push(
							<ul key={"infinity-menu-children-list" + currLevel}>
								{childrenList}
							</ul>
						);
					}
					prevs.push(openedNode);
				}
				return prevs;
			}
		}
	}
	/*
	 *  @function _renderBody
	 *  @description Renders the body content
	 */
	renderBody(displayTree) {
		const {
			emptyTreeComponent,
			emptyTreeComponentProps
		} = this.props;

		if (displayTree.length) {
			return displayTree;
		}
		else if (emptyTreeComponent) {
			const emptyTreeElement = React.createElement(emptyTreeComponent, emptyTreeComponentProps);
			return emptyTreeElement;
		}
		else {
			return null;
		}
	}
	/*
	 *  @function render
	 *  @description React render method for creating infinity menu
	 */
	render() {
		const tree = this.props.tree;
		/*find filtered folders base on search, if there no search, return all*/
		const filteredTree = this.state.search.isSearching && this.state.search.searchInput ? tree.reduce((prev, curr, key) => {
			if (key === undefined) {
				return prev;
			}
			return this.findFiltered(prev, curr, key);
		}, []) : tree;


		/*recursive go through the tree*/
		const displayTree = filteredTree.reduce((prev, curr, key) => {
			if (key === undefined) {
				return prev;
			}
			return this.setDisplayTree(tree, prev, curr, key.toString());
		}, []);

		/*header component*/
		const headerProps = {
			isSearching: this.state.search.isSearching,
			searchInput: this.state.search.searchInput,
			setSearchInput: this.setSearchInput,
			stopSearching: this.stopSearching,
			startSearching: this.startSearching,
			...this.props.headerProps
		};

		const bodyContent = this.renderBody(displayTree);
		const defaultHeaderContent = this.props.disableDefaultHeaderContent ? null : React.createElement(SearchInput, headerProps);
		const headerContent = this.props.headerContent ? React.createElement(this.props.headerContent, headerProps) : defaultHeaderContent;

		return (
			<div className="infinity-menu-container">
				{headerContent}
				<div className="infinity-menu-display-tree-container">
					{bodyContent}
				</div>
			</div>
		);
	}
}

InfinityMenu.propTypes = {
	tree: PropTypes.array,
	headerContent: PropTypes.any,
	disableDefaultHeaderContent: PropTypes.bool,
	headerProps: PropTypes.object,
	customComponentMappings: PropTypes.object,
	emptyTreeComponent: PropTypes.any,
	emptyTreeComponentProps: PropTypes.object,
	filter: PropTypes.func,
	onNodeMouseClick: PropTypes.func,
	onLeafMouseClick: PropTypes.func,
	onLeafMouseDown: PropTypes.func,
	onLeafMouseUp: PropTypes.func,
	shouldComponentUpdate: PropTypes.func,
	maxLeaves: PropTypes.number
};

InfinityMenu.defaultProps = {
	tree: [],
	headerContent: null,
	disableDefaultHeaderContent: false,
	headerProps: {},
	emptyTreeComponent: null,
	emptyTreeComponentProps: {},
	filter: (node, searchInput) => node.name.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0,
	onNodeMouseClick: ()=>{},
	onLeafMouseClick: ()=>{},
	onLeafMouseDown: ()=>{},
	onLeafMouseUp: ()=>{},
	maxLeaves: Infinity
};