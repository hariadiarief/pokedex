import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { useDispatch } from 'react-redux'

import * as ActionPokemon from 'Redux/Action/Pokemon'
import { Layout } from 'Components'

import ImgBroken from 'Assets/broken.png'
import ImgLoader from 'Assets/loader.gif'

export default function Type() {
	const dispatch = useDispatch()

	const [type, setType] = useState([])
	const [detailPokemonType, setDetailPokemonType] = useState([])

	useEffect(() => {
		dispatch(ActionPokemon.getType()).then((response) => setType(response.results.map((item) => ({ label: item.name, value: item.name }))))
	}, [dispatch])

	const getPokemonByType = (e) => {
		dispatch(ActionPokemon.getPokemonByType(e)).then((response) => {
			let temp = []
			response.pokemon.forEach((item) => {
				dispatch(ActionPokemon.getPokemonDetail(item.pokemon.name)).then((response) => {
					temp = temp.concat(response)
					setDetailPokemonType(temp)
				})
			})
		})
	}

	return (
		<Layout>
			<div className='home container'>
				<div className='home__title'>Pokemon Type</div>
				<Select placeholder='Select Pokemon' options={type} onChange={(e) => getPokemonByType(e.value)} />
				<div className='home__grid '>
					{detailPokemonType.length === 0
						? null
						: detailPokemonType.map((pokemon, index) => {
								return (
									<div className='home__grid__item' key={index}>
										<Link className='home__grid__item__content' to={`/pokemon/${pokemon.name}`}>
											<img
												alt={pokemon.name}
												className='home__grid__item__content__image'
												src={pokemon.sprites.front_default || ImgLoader}
												onError={(e) => {
													e.target.onError = null
													e.target.src = ImgBroken
												}}
											/>
											<span>{pokemon.name}</span>
										</Link>
									</div>
								)
						  })}
				</div>
				`
			</div>
		</Layout>
	)
}
