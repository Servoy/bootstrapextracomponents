/*
 * This file is part of the Servoy Business Application Platform, Copyright (C) 2012-2013 Servoy BV 
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Gets the specified user property
 * Provides the default persistence implementation for the User Properties Service Interface
 * 
 * @param {String} name
 * 
 * @return {String}
 * 
 * @properties={typeid:24,uuid:"D230DB01-83F9-4308-ACBC-49046469967C"}
 */
function getUserProperty(name) {
	return application.getUserProperty(name)
}

/**
 * Sets the specified user property
 * Provides the default persistence implementation for the User Properties Service Interface
 * 
 * @param {String} name
 * @param {String} value
 *
 * @properties={typeid:24,uuid:"410DF7DC-5185-49F1-8EBB-72DFAD942A06"}
 */
function setUserProperty(name, value) {
	application.setUserProperty(name,value)
}
